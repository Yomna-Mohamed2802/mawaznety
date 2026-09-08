import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';
import SourceBadge from './SourceBadge';
import { formatValue } from '../../data/schema';
import { useLang } from '../../context/LangContext';

export default function SourceDrawer({ figure, onClose }) {
  const { lang, t } = useLang();
  if (!figure) return null;

  return (
    <AnimatePresence>
      {figure && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-900/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 overflow-y-auto"
            style={{ boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.1)' }}
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-primary-100/40 px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-primary-900">{t.drawerTitle}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-primary-50 transition-colors"
              >
                <HiOutlineX className="w-5 h-5 text-primary-500" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <p className="text-xs text-primary-500 mb-1">{t.drawerValue}</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-900">{formatValue(figure)}</p>
              </div>

              <div>
                <p className="text-xs text-primary-500 mb-1">{t.drawerName}</p>
                <p className="text-sm font-medium text-primary-800">{figure.label}</p>
              </div>

              <div>
                <p className="text-xs text-primary-500 mb-1">{t.drawerId}</p>
                <code className="text-xs bg-surface-warm px-2 py-1 rounded-lg text-primary-700 font-mono">{figure.id}</code>
              </div>

              <div>
                <p className="text-xs text-primary-500 mb-2">{t.drawerStatus}</p>
                <SourceBadge status={figure.verificationStatus} showLabel size="md" />
              </div>

              <div>
                <p className="text-xs text-primary-500 mb-1">{t.drawerSource}</p>
                <p className="text-sm text-primary-700">{figure.sourceId || t.drawerUnspecified}</p>
              </div>

              {figure.page && (
                <div>
                  <p className="text-xs text-primary-500 mb-1">{t.drawerPage}</p>
                  <p className="text-sm text-primary-700">{figure.page}</p>
                </div>
              )}

              <div>
                <p className="text-xs text-primary-500 mb-1">{t.drawerYear}</p>
                <p className="text-sm text-primary-700">{figure.fiscalYear}</p>
              </div>

              <div>
                <p className="text-xs text-primary-500 mb-1">{t.drawerType}</p>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200/60">
                  {figure.figureType === 'official' ? t.drawerOfficial :
                   figure.figureType === 'derived' ? t.drawerDerived : t.drawerIllustrative}
                </span>
              </div>

              {figure.derivedFrom && figure.derivedFrom.length > 0 && (
                <div>
                  <p className="text-xs text-primary-500 mb-1">{t.drawerDerivedFrom}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {figure.derivedFrom.map((id) => (
                      <code key={id} className="text-[11px] bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full border border-violet-200/60">
                        {id}
                      </code>
                    ))}
                  </div>
                </div>
              )}

              {figure.formula && (
                <div>
                  <p className="text-xs text-primary-500 mb-1">{t.drawerFormula}</p>
                  <div className="bg-surface-warm rounded-xl p-3 border border-primary-100/40">
                    <code className="text-xs text-primary-700 font-mono whitespace-pre-wrap">{figure.formula}</code>
                  </div>
                </div>
              )}

              {figure.note && (
                <div>
                  <p className="text-xs text-primary-500 mb-1">{t.drawerNote}</p>
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                    {figure.note}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
