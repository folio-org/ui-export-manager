import React from 'react';
import { FormattedMessage } from 'react-intl';

const EXPORT_JOB_STATUSES = ['SCHEDULED', 'IN_PROGRESS', 'SUCCESSFUL', 'FAILED'];

export const EXPORT_JOB_STATUS_OPTIONS = EXPORT_JOB_STATUSES.map(status => ({
  value: status,
  label: <FormattedMessage id={`ui-export-manager.exportJob.status.${status}`} />,
}));
