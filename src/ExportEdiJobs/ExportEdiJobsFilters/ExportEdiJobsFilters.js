import React, {
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
} from '@folio/stripes/components';

import {
  AcqCheckboxFilter,
  AcqDateRangeFilter,
  BooleanFilter,
  PluggableUserFilter,
  PluggableOrganizationFilter,
} from '@folio/stripes-acq-components';

import { EXPORT_JOB_STATUS_OPTIONS } from '../../common/constants';
import { ExportMethodFilter } from './ExportMethodFilter';

const applyFiltersAdapter = (applyFilters) => ({ name, values }) => applyFilters(name, values);

export const ExportEdiJobsFilters = ({
  activeFilters,
  applyFilters,
  disabled,
}) => {
  const adaptedApplyFilters = useCallback(
    applyFiltersAdapter(applyFilters),
    [applyFilters],
  );

  return (
    <AccordionSet>
      <AcqCheckboxFilter
        id="edi-status-filter"
        activeFilters={activeFilters?.status}
        disabled={disabled}
        labelId="ui-export-manager.exportJob.status"
        name="status"
        onChange={adaptedApplyFilters}
        options={EXPORT_JOB_STATUS_OPTIONS}
        closedByDefault={false}
      />

      <ExportMethodFilter
        id="exportConfigId"
        activeFilters={activeFilters?.exportConfigId}
        disabled={disabled}
        labelId="ui-export-manager.exportJob.exportMethod"
        name="exportConfigId"
        onChange={adaptedApplyFilters}
      />

      <PluggableOrganizationFilter
        activeFilters={activeFilters?.vendorId}
        disabled={disabled}
        labelId="ui-export-manager.exportJob.organization"
        name="vendorId"
        onChange={adaptedApplyFilters}
      />

      <BooleanFilter
        id="edi-system-filter"
        activeFilters={activeFilters?.isSystemSource}
        labelId="ui-export-manager.exportJob.system"
        name="isSystemSource"
        onChange={adaptedApplyFilters}
        disabled={disabled}
      />

      <PluggableUserFilter
        activeFilters={activeFilters?.createdByUserId}
        disabled={disabled}
        labelId="ui-export-manager.exportJob.source"
        name="createdByUserId"
        onChange={adaptedApplyFilters}
      />

      <AcqDateRangeFilter
        id="edi-start-time-filter"
        activeFilters={activeFilters?.startTime}
        labelId="ui-export-manager.exportJob.startTime"
        name="startTime"
        onChange={adaptedApplyFilters}
        disabled={disabled}
      />

      <AcqDateRangeFilter
        id="edi-end-time-filter"
        activeFilters={activeFilters?.endTime}
        labelId="ui-export-manager.exportJob.endTime"
        name="endTime"
        onChange={adaptedApplyFilters}
        disabled={disabled}
      />
    </AccordionSet>
  );
};

ExportEdiJobsFilters.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  applyFilters: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ExportEdiJobsFilters.defaultProps = {
  disabled: false,
};
