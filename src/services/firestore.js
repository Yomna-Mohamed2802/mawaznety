import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

// ==================== USERS ====================

export const createUserProfile = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  const existing = await getDoc(userRef);
  if (existing.exists()) return existing.data();
  const profile = {
    uid,
    email: data.email || null,
    name: data.name || 'User',
    avatar: data.avatar || null,
    provider: data.provider || 'unknown',
    isAdmin: data.isAdmin || false,
    emailVerified: data.emailVerified || false,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
  };
  await setDoc(userRef, profile);
  return profile;
};

export const getUserProfile = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};

export const updateUserProfile = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { ...data, lastLogin: serverTimestamp() });
};

// ==================== VOTES ====================

export const saveVote = async (categoryId, optionId, uid) => {
  const voteRef = doc(db, 'votes', `${categoryId}_${uid}`);
  const existing = await getDoc(voteRef);
  if (existing.exists()) {
    return { success: false, error: 'لقد صوت بالفعل في هذا التصنيف' };
  }

  const batch = writeBatch(db);

  batch.set(voteRef, {
    categoryId,
    optionId,
    uid,
    createdAt: serverTimestamp(),
  });

  const countRef = doc(db, 'voteCounts', categoryId);
  const countSnap = await getDoc(countRef);
  if (countSnap.exists()) {
    const data = countSnap.data();
    const newCounts = { ...data };
    newCounts[optionId] = (newCounts[optionId] || 0) + 1;
    newCounts.total = (newCounts.total || 0) + 1;
    batch.set(countRef, newCounts);
  } else {
    const initial = { total: 1 };
    initial[optionId] = 1;
    batch.set(countRef, initial);
  }

  await batch.commit();
  return { success: true };
};

export const getUserVote = async (categoryId, uid) => {
  const voteRef = doc(db, 'votes', `${categoryId}_${uid}`);
  const snap = await getDoc(voteRef);
  return snap.exists() ? snap.data().optionId : null;
};

export const getVoteCounts = async (categoryId) => {
  const countRef = doc(db, 'voteCounts', categoryId);
  const snap = await getDoc(countRef);
  return snap.exists() ? snap.data() : { total: 0 };
};

export const subscribeToVoteCounts = (categoryId, callback) => {
  const countRef = doc(db, 'voteCounts', categoryId);
  return onSnapshot(countRef, (snap) => {
    callback(snap.exists() ? snap.data() : { total: 0 });
  });
};

// ==================== QUIZ ====================

export const saveQuizScore = async (uid, data) => {
  const scoreRef = doc(db, 'quizScores', uid);
  const existing = await getDoc(scoreRef);

  if (existing.exists()) {
    const prev = existing.data();
    const newBest = Math.max(prev.bestScore || 0, data.score);
    const newTotal = (prev.totalAttempts || 0) + 1;
    await updateDoc(scoreRef, {
      bestScore: newBest,
      totalAttempts: newTotal,
      lastScore: data.score,
      lastAttempt: serverTimestamp(),
      history: arrayUnion({
        score: data.score,
        total: data.total,
        date: new Date().toISOString(),
      }),
    });
    return { bestScore: newBest, totalAttempts: newTotal };
  } else {
    await setDoc(scoreRef, {
      uid,
      bestScore: data.score,
      totalAttempts: 1,
      lastScore: data.score,
      lastAttempt: serverTimestamp(),
      createdAt: serverTimestamp(),
      history: [
        {
          score: data.score,
          total: data.total,
          date: new Date().toISOString(),
        },
      ],
    });
    return { bestScore: data.score, totalAttempts: 1 };
  }
};

export const getUserQuizScores = async (uid) => {
  const scoreRef = doc(db, 'quizScores', uid);
  const snap = await getDoc(scoreRef);
  return snap.exists() ? snap.data() : null;
};

export const getLeaderboard = async (topN = 10) => {
  const q = query(
    collection(db, 'quizScores'),
    orderBy('bestScore', 'desc'),
    limit(topN)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ==================== SETTINGS ====================

const DEFAULT_SETTINGS = {
  siteName: 'موازنتي',
  siteDescription: 'مشروع تعليمي مستقل لموازنة المواطن المصرية 2026/2027',
  allowRegistration: true,
  requireApproval: false,
  emailNotifications: true,
  maintenanceMode: false,
};

export const getSettings = async () => {
  const settingsRef = doc(db, 'config', 'siteSettings');
  try {
    const snap = await getDoc(settingsRef);
    if (snap.exists()) return snap.data();
    await setDoc(settingsRef, DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  } catch (e) {
    console.warn('Firestore settings unavailable, using defaults');
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = async (settings) => {
  const settingsRef = doc(db, 'config', 'siteSettings');
  await setDoc(settingsRef, settings, { merge: true });
};

// ==================== ANALYTICS ====================

export const incrementCounter = async (field) => {
  try {
    const analyticsRef = doc(db, 'analytics', 'counters');
    const snap = await getDoc(analyticsRef);
    if (snap.exists()) {
      await updateDoc(analyticsRef, { [field]: increment(1) });
    } else {
      const initial = { totalVisitors: 0, questionsAsked: 0, quizzesCompleted: 0, totalVotes: 0 };
      initial[field] = 1;
      await setDoc(analyticsRef, initial);
    }
  } catch (e) {
    console.warn('Analytics increment failed:', e);
  }
};

export const getAnalytics = async () => {
  try {
    const analyticsRef = doc(db, 'analytics', 'counters');
    const snap = await getDoc(analyticsRef);
    return snap.exists()
      ? snap.data()
      : { totalVisitors: 0, questionsAsked: 0, quizzesCompleted: 0, totalVotes: 0 };
  } catch (e) {
    console.warn('Analytics fetch failed:', e);
    return { totalVisitors: 0, questionsAsked: 0, quizzesCompleted: 0, totalVotes: 0 };
  }
};

export const subscribeToAnalytics = (callback) => {
  const analyticsRef = doc(db, 'analytics', 'counters');
  return onSnapshot(analyticsRef, (snap) => {
    callback(
      snap.exists()
        ? snap.data()
        : { totalVisitors: 0, questionsAsked: 0, quizzesCompleted: 0, totalVotes: 0 }
    );
  });
};
