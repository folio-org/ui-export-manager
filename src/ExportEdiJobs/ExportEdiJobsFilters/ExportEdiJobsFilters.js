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

import {
  EXPORT_JOB_STATUS_OPTIONS,
  ORGANIZATION_INTEGRATION_TYPE_OPTIONS,
} from '../../common/constants';
import { ExportMethodFilter } from './ExportMethodFilter';

const applyFiltersAdapter = (applyFilters) => ({ name, values }) => applyFilters(name, values);

export const ExportEdiJobsFilters = ({
  activeFilters,
  applyFilters,
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
        labelId="ui-export-manager.exportJob.status"
        name="status"
        onChange={adaptedApplyFilters}
        options={EXPORT_JOB_STATUS_OPTIONS}
        closedByDefault={false}
      />

      <AcqCheckboxFilter
        id="integration-type-filter"
        activeFilters={activeFilters?.integrationType}
        labelId="ui-export-manager.exportJob.integrationType"
        name="integrationType"
        onChange={adaptedApplyFilters}
        options={ORGANIZATION_INTEGRATION_TYPE_OPTIONS}
        closedByDefault={false}
      />

      <ExportMethodFilter
        id="exportConfigId"
        activeFilters={activeFilters?.exportConfigId}
        labelId="ui-export-manager.exportJob.exportMethod"
        name="exportConfigId"
        onChange={adaptedApplyFilters}
        vendorId={activeFilters?.vendorId?.[0]}
      />

      <PluggableOrganizationFilter
        activeFilters={activeFilters?.vendorId}
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
      />

      <PluggableUserFilter
        activeFilters={activeFilters?.createdByUserId}
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
      />

      <AcqDateRangeFilter
        id="edi-end-time-filter"
        activeFilters={activeFilters?.endTime}
        labelId="ui-export-manager.exportJob.endTime"
        name="endTime"
        onChange={adaptedApplyFilters}
      />
    </AccordionSet>
  );
};

ExportEdiJobsFilters.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  applyFilters: PropTypes.func.isRequired,
};
