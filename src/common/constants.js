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

export const ORGANIZATION_INTEGRATION_TYPE = {
  claiming: 'Claiming',
  ordering: 'Ordering',
};

export const ORGANIZATION_INTEGRATION_TYPE_OPTIONS = Object.values(ORGANIZATION_INTEGRATION_TYPE).map((type) => ({
  value: type,
  label: <FormattedMessage id={`ui-export-manager.exportJob.integrationType.${type.toLocaleLowerCase()}`} />,
}));

export const EXPORT_CONFIGS_API = 'data-export-spring/configs';
export const EXPORT_JOBS_API = 'data-export-spring/jobs';
export const EXPORT_JOBS_DELETION_INTERVALS_API = 'data-export-spring/job-deletion-intervals';

export const MULTIPLE_EXPORTED_JOB_TYPES = [
  'BURSAR_FEES_FINES',
];
export const EXPORTED_JOB_TYPES = [
  ...MULTIPLE_EXPORTED_JOB_TYPES,
  'CIRCULATION_LOG',
  'E_HOLDINGS',
  'AUTH_HEADINGS_UPDATES',
  'FAILED_LINKED_BIB_UPDATES',
];

export const EXPORT_FILE_TYPE = {
  edi: 'EDI',
  csv: 'CSV',
};

export const BE_INTERFACE = {
  organizations: 'organizations.organizations',
};
