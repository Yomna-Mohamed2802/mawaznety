import { supabase } from './supabase';

// ==================== USERS ====================

export const createUserProfile = async (uid, data) => {
  try {
    const { auth } = await import('./firebase');
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');

    const idToken = await currentUser.getIdToken();
    const response = await fetch('/api/admin?action=create-profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, ...data }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.details || err.error || 'Profile creation failed');
    }

    return await response.json();
  } catch (e) {
    console.warn('Profile creation error:', e.message || e);
    return null;
  }
};

export const updateUserProfile = async (uid, data) => {
  try {
    const { auth } = await import('./firebase');
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');

    const idToken = await currentUser.getIdToken();
    const { is_admin: _, ...safeData } = data;
    const response = await fetch('/api/admin?action=update-profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, ...safeData }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.details || err.error || 'Profile update failed');
    }
  } catch (e) {
    console.warn('Profile update error:', e.message || e);
  }
};

// ==================== VOTES ====================

export const saveVote = async (categoryId, optionId) => {
  try {
    const { auth } = await import('./firebase');
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');

    const idToken = await currentUser.getIdToken();
    const response = await fetch('/api/vote', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category_id: categoryId, option_id: optionId }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Vote failed' };
    }

    return { success: true };
  } catch (error) {
    console.error('saveVote error:', error);
    throw error;
  }
};

export const getVoteCounts = async (categoryId) => {
  const { data } = await supabase.rpc('get_vote_counts', { p_category_id: categoryId });

  if (!data || data.length === 0) return { total: 0 };

  const counts = { total: 0 };
  data.forEach((row) => {
    counts[row.option_id] = row.vote_count;
    counts.total += row.vote_count;
  });
  return counts;
};

let votePollingIntervals = {};

export const subscribeToVoteCounts = (categoryId, callback) => {
  getVoteCounts(categoryId).then(callback);

  const interval = setInterval(() => {
    getVoteCounts(categoryId).then(callback);
  }, 5000);

  votePollingIntervals[categoryId] = interval;

  return () => {
    if (votePollingIntervals[categoryId]) {
      clearInterval(votePollingIntervals[categoryId]);
      delete votePollingIntervals[categoryId];
    }
  };
};

// ==================== QUIZ ====================

export const saveQuizScore = async (score, total) => {
  try {
    const { auth } = await import('./firebase');
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');

    const idToken = await currentUser.getIdToken();
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score, total }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Quiz save failed');
    }

    return result;
  } catch (error) {
    console.error('saveQuizScore error:', error);
    throw error;
  }
};

export const getLeaderboard = async (topN = 10) => {
  const { data } = await supabase.rpc('get_leaderboard', { p_top_n: topN });

  return (data || []).map((d) => ({
    rank: d.rank,
    bestScore: d.best_score,
    totalAttempts: d.total_attempts,
  }));
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
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'siteSettings')
      .single();

    if (data) {
      return {
        siteName: data.site_name,
        siteDescription: data.site_description,
        allowRegistration: data.allow_registration,
        requireApproval: data.require_approval,
        emailNotifications: data.email_notifications,
        maintenanceMode: data.maintenance_mode,
      };
    }
    return DEFAULT_SETTINGS;
  } catch (e) {
    console.warn('Settings unavailable, using defaults');
    return DEFAULT_SETTINGS;
  }
};

// ==================== ANALYTICS ====================

export const trackEvent = async (eventName, page = null, metadata = null) => {
  try {
    await supabase
      .from('analytics_events')
      .insert({
        event_name: eventName,
        page,
        metadata,
      });
  } catch (e) {
    console.warn('Analytics event failed:', e);
  }
};

export const incrementCounter = async (field) => {
  await trackEvent(field);
};

export const getPublicStats = async () => {
  try {
    const { data } = await supabase.rpc('get_public_stats');

    if (data && data.length > 0) {
      const row = data[0];
      return {
        totalVisitors: row.total_visitors || 0,
        questionsAsked: row.questions_asked || 0,
        quizzesCompleted: row.quizzes_completed || 0,
        totalVotes: row.total_votes || 0,
      };
    }
    return { totalVisitors: 0, questionsAsked: 0, quizzesCompleted: 0, totalVotes: 0 };
  } catch (e) {
    console.warn('Public stats failed:', e);
    return { totalVisitors: 0, questionsAsked: 0, quizzesCompleted: 0, totalVotes: 0 };
  }
};

// ==================== EMAILS ====================

export const subscribeEmail = async (email, consent = true) => {
  const normalizedEmail = email.trim().toLowerCase();
  const { error } = await supabase
    .from('email_subscribers')
    .insert({ email: normalizedEmail, consent });

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'هذا البريد مسجل بالفعل' };
    }
    throw error;
  }
  return { success: true };
};

// ==================== ADMIN API (server-side) ====================

export const getAdminAnalytics = async () => {
  try {
    const { auth } = await import('./firebase');
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    const idToken = await currentUser.getIdToken();

    const response = await fetch('/api/admin?action=overview', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.details || err.error || 'Admin API failed');
    }

    return await response.json();
  } catch (e) {
    console.warn('Admin analytics failed:', e.message || e);
    return null;
  }
};

export const getAdminSubscribers = async () => {
  try {
    const { auth } = await import('./firebase');
    const currentUser = auth.currentUser;

    if (!currentUser) throw new Error('Not authenticated');

    const idToken = await currentUser.getIdToken();
    const response = await fetch('/api/admin?action=subscribers', {
      headers: { Authorization: `Bearer ${idToken}` },
    });

    if (!response.ok) throw new Error('Admin API failed');
    return await response.json();
  } catch (e) {
    console.warn('Admin subscribers failed:', e);
    return { subscribers: [] };
  }
};

export const getAdminUsers = async () => {
  try {
    const { auth } = await import('./firebase');
    const currentUser = auth.currentUser;

    if (!currentUser) throw new Error('Not authenticated');

    const idToken = await currentUser.getIdToken();
    const response = await fetch('/api/admin?action=users', {
      headers: { Authorization: `Bearer ${idToken}` },
    });

    if (!response.ok) throw new Error('Admin API failed');
    return await response.json();
  } catch (e) {
    console.warn('Admin users failed:', e);
    return { users: [] };
  }
};

export const saveSettingsAdmin = async (settings) => {
  try {
    const { auth } = await import('./firebase');
    const currentUser = auth.currentUser;

    if (!currentUser) throw new Error('Not authenticated');

    const idToken = await currentUser.getIdToken();
    const response = await fetch('/api/admin?action=save-settings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) throw new Error('Admin API failed');
    return await response.json();
  } catch (e) {
    console.warn('Save settings failed:', e);
    throw e;
  }
};
