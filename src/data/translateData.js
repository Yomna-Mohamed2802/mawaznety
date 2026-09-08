import translations from './translations';

export function getDataLabel(lang, section, key) {
  const t = translations[lang] || translations.ar;
  return t.data?.[section]?.[key] || key;
}