import { TRANSLATION_KEYS_DICT } from './constants';

export const getExportTypeLabel = (exportType, intl) => {
  const translationKey = TRANSLATION_KEYS_DICT[exportType];

  return translationKey
    ? intl.formatMessage({ id: translationKey })
    : exportType;
};
