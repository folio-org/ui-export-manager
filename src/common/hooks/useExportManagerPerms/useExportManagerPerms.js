import { useStripes } from '@folio/stripes/core';

import { BULK_PERMISSIONS } from '../../../ExportJobs/constants';

export const useExportManagerPerms = () => {
  const stripes = useStripes();

  const hasAnyUserEditPerms = stripes.hasPerm(BULK_PERMISSIONS.BULK_EDIT_LOCAL_VIEW)
    || stripes.hasPerm(BULK_PERMISSIONS.BULK_EDIT_IN_APP_EDIT_USERS);
  const hasInAppAnyPerms = stripes.hasPerm(BULK_PERMISSIONS.BULK_EDIT_IN_APP_VIEW);
  const hasAllExportManagerPerms = stripes.hasPerm('ui-export-manager.export-manager.all');

  return {
    hasAnyUserEditPerms,
    hasInAppAnyPerms,
    hasAllExportManagerPerms,
  };
};
