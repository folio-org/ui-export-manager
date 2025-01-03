import React, {
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
} from '@folio/stripes/components';

import {
  AcqCheckboxFilter,
  AcqDateRangeFilter,
  BooleanFilter,
  PluggableUserFilter,
} from '@folio/stripes-acq-components';

import {
  EXPORT_JOB_STATUSES,
  EXPORT_JOB_TYPES,
  EXPORT_JOB_TYPES_REQUEST_MAP,
} from '../constants';

const applyFiltersAdapter = (applyFilters) => ({ name, values }) => applyFilters(name, values);

const mapJobTypeValues = (values) => {
  return values.reduce((acc, value) => {
    // remove unsupported job types
    if (!EXPORT_JOB_TYPES.includes(value)) {
      return acc;
    }

    // spread combined job types
    if (value in EXPORT_JOB_TYPES_REQUEST_MAP) {
      return [...acc, ...EXPORT_JOB_TYPES_REQUEST_MAP[value]];
    }

    return [...acc, value];
  }, []);
};

const statusFilterOptions = EXPORT_JOB_STATUSES.map(status => ({
  value: status,
  label: <FormattedMessage id={`ui-export-manager.exportJob.status.${status}`} />,
}));
const typeFilterOptions = EXPORT_JOB_TYPES.map(type => ({
  value: type,
  label: <FormattedMessage id={`ui-export-manager.exportJob.type.${type}`} />,
}));

export const ExportJobsFilters = ({
  disabled = false,
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
        activeFilters={activeFilters?.status}
        disabled={disabled}
        labelId="ui-export-manager.exportJob.status"
        name="status"
        onChange={adaptedApplyFilters}
        options={statusFilterOptions}
        closedByDefault={false}
      />

      <AcqCheckboxFilter
        activeFilters={activeFilters?.type}
        disabled={disabled}
        labelId="ui-export-manager.exportJob.type"
        name="type"
        onChange={({ name, values }) => adaptedApplyFilters({ name, values: mapJobTypeValues(values) })}
        options={typeFilterOptions}
        closedByDefault={false}
      />

      <BooleanFilter
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
        activeFilters={activeFilters?.startTime}
        labelId="ui-export-manager.exportJob.startTime"
        name="startTime"
        onChange={adaptedApplyFilters}
        disabled={disabled}
      />

      <AcqDateRangeFilter
        activeFilters={activeFilters?.endTime}
        labelId="ui-export-manager.exportJob.endTime"
        name="endTime"
        onChange={adaptedApplyFilters}
        disabled={disabled}
      />
    </AccordionSet>
  );
};

ExportJobsFilters.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  applyFilters: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
