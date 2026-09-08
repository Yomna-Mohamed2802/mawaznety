import translations from './translations';

export function getDataLabel(lang, section, key, originalData) {
  const t = translations[lang] || translations.ar;
  return t.data?.[section]?.[key] || (originalData && originalData.label) || key;
}