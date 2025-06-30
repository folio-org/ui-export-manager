import { useStripes } from '@folio/stripes/core';

export const useExportManagerPerms = () => {
  const stripes = useStripes();

  const hasAllExportManagerPerms = stripes.hasPerm('ui-export-manager.export-manager.all');

  return {
    hasAllExportManagerPerms,
  };
};
