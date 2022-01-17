import React, { useMemo } from 'react';

import { Loading } from '@folio/stripes/components';
import {
  SelectionFilter,
} from '@folio/stripes-acq-components';

import { useConfigs } from './useConfigs';

const ExportMethodFilter = (props) => {
  const { configs, isFetching } = useConfigs();

  const options = useMemo(() => (
    configs.map(config => ({
      label: config.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.configName,
      value: config.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.exportConfigId,
    }))
  ), [configs]);

  if (isFetching) return <Loading />;

  return (
    <SelectionFilter
      {...props}
      options={options}
    />
  );
};

export default ExportMethodFilter;
