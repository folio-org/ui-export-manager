import { EXPORT_JOB_TYPE_KEYS } from '../../ExportJobs/constants';

const {
  AUTH_HEADINGS_UPDATES,
  BURSAR_FEES_FINES,
  CIRCULATION_LOG,
  E_HOLDINGS,
} = EXPORT_JOB_TYPE_KEYS;

const EDIFACT = 'EDIFACT_ORDERS_EXPORT';
const CLAIMS = 'CLAIMS';

export const TRANSLATION_KEYS_DICT = {
  [AUTH_HEADINGS_UPDATES]: `ui-export-manager.exportJob.type.${AUTH_HEADINGS_UPDATES}`,
  [BURSAR_FEES_FINES]: `ui-export-manager.exportJob.type.${BURSAR_FEES_FINES}`,
  [CIRCULATION_LOG]: `ui-export-manager.exportJob.type.${CIRCULATION_LOG}`,
  [E_HOLDINGS]: `ui-export-manager.exportJob.type.${E_HOLDINGS}`,
  [EDIFACT]: `ui-export-manager.exportJob.details.type.${EDIFACT}`,
  [CLAIMS]: 'ui-export-manager.exportJob.integrationType.claiming',
};

export const DELETION_INTERVALS_FIELD_ARRAY_NAME = 'jobDeletionIntervals';
