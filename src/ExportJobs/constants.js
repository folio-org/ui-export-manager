export const EXPORT_JOB_STATUSES = ['SCHEDULED', 'IN_PROGRESS', 'SUCCESSFUL', 'FAILED'];

export const BULK_PERMISSIONS = {
  BULK_EDIT_IN_APP_VIEW: 'ui-bulk-edit.app-view',
  BULK_EDIT_LOCAL_VIEW: 'ui-bulk-edit.view',
  BULK_EDIT_IN_APP_EDIT_USERS: 'ui-bulk-edit.app-edit.users',
};

export const BULK_ENTITY_TYPES = {
  USER: 'USER',
  ITEM: 'ITEM',
  HOLDINGS_RECORD: 'HOLDINGS_RECORD',
};

export const EXPORT_JOB_TYPE_KEYS = {
  AUTH_HEADINGS_UPDATES: 'AUTH_HEADINGS_UPDATES',
  BURSA_FEES_FINES: 'BURSAR_FEES_FINES',
  CIRCULATION_LOG: 'CIRCULATION_LOG',
  E_HOLDINGS: 'E_HOLDINGS',
  BULK_EDIT: 'BULK_EDIT',
  EDIFACT_ORDERS_EXPORT: 'EDIFACT_ORDERS_EXPORT',
};

export const EXPORT_JOB_TYPES = [
  EXPORT_JOB_TYPE_KEYS.AUTH_HEADINGS_UPDATES,
  EXPORT_JOB_TYPE_KEYS.BURSA_FEES_FINES,
  EXPORT_JOB_TYPE_KEYS.CIRCULATION_LOG,
  EXPORT_JOB_TYPE_KEYS.E_HOLDINGS,
  EXPORT_JOB_TYPE_KEYS.BULK_EDIT,
  EXPORT_JOB_TYPE_KEYS.EDIFACT_ORDERS_EXPORT,
];

export const EXPORT_JOB_TYPES_REQUEST_MAP = {
  'AUTH_HEADINGS_UPDATES': ['AUTH_HEADINGS_UPDATES', 'FAILED_LINKED_BIB_UPDATES'],
};
