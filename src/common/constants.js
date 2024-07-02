import React from 'react';
import { FormattedMessage } from 'react-intl';

export const EXPORT_JOB_STATUSES = {
  scheduled: 'SCHEDULED',
  inProgress: 'IN_PROGRESS',
  successful: 'SUCCESSFUL',
  failed: 'FAILED',
};

export const EXPORT_JOB_STATUS_OPTIONS = Object.values(EXPORT_JOB_STATUSES).map(status => ({
  value: status,
  label: <FormattedMessage id={`ui-export-manager.exportJob.status.${status}`} />,
}));

export const EXPORT_CONFIGS_API = 'data-export-spring/configs';
export const EXPORT_JOBS_API = 'data-export-spring/jobs';
export const MULTIPLE_EXPORTED_JOB_TYPES = [
  'BULK_EDIT_IDENTIFIERS',
  'BULK_EDIT_QUERY',
  'BULK_EDIT_UPDATE',
  'BURSAR_FEES_FINES',
];
export const EXPORTED_JOB_TYPES = [
  ...MULTIPLE_EXPORTED_JOB_TYPES,
  'CIRCULATION_LOG',
  'E_HOLDINGS',
  'AUTH_HEADINGS_UPDATES',
  'FAILED_LINKED_BIB_UPDATES',
];
