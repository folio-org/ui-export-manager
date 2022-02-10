import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Loading } from '@folio/stripes/components';
import {
  SelectionFilter,
} from '@folio/stripes-acq-components';

import { useConfigs } from './useConfigs';

const ExportMethodFilter = ({ vendorId, ...rest }) => {
  const { configs, isFetching, refetch } = useConfigs(vendorId);

  useEffect(() => refetch(), [vendorId, refetch]);

  const options = useMemo(() => (
    configs.map(config => ({
      label: config.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.configName,
      value: config.id,
    }))
  ), [configs]);

  if (isFetching) return <Loading />;

  return (
    <SelectionFilter
      {...rest}
      options={options}
    />
  );
};

ExportMethodFilter.propTypes = {
  vendorId: PropTypes.string.isRequired,
};

export default ExportMethodFilter;
