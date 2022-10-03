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
