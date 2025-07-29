import { EXPORT_JOB_TYPE_KEYS } from '../../ExportJobs/constants';

const {
  AUTH_HEADINGS_UPDATES,
  BURSA_FEES_FINES,
  CIRCULATION_LOG,
  E_HOLDINGS,
  ORDERS_CSV,
  ORDERS_EDI,
} = EXPORT_JOB_TYPE_KEYS;

export const TRANSLATION_KEYS_DICT = {
  [AUTH_HEADINGS_UPDATES]: `ui-export-manager.exportJob.type.${AUTH_HEADINGS_UPDATES}`,
  [BURSA_FEES_FINES]: `ui-export-manager.exportJob.type.${BURSA_FEES_FINES}`,
  [CIRCULATION_LOG]: `ui-export-manager.exportJob.type.${CIRCULATION_LOG}`,
  [E_HOLDINGS]: `ui-export-manager.exportJob.type.${E_HOLDINGS}`,
  EDIFACT_ORDERS_EXPORT: `ui-export-manager.exportJob.type.${ORDERS_EDI}`,
  CLAIMS: `ui-export-manager.exportJob.type.${ORDERS_CSV}`,
};

export const DELETION_INTERVALS_FIELD_ARRAY_NAME = 'jobDeletionIntervals';
