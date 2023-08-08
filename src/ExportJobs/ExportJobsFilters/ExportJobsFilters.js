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

import { useStripes } from '@folio/stripes/core';
import {
  BULK_PERMISSIONS,
  EXPORT_JOB_STATUSES,
  EXPORT_JOB_TYPE_KEYS,
  EXPORT_JOB_TYPES,
  EXPORT_JOB_TYPES_REQUEST_MAP,
} from '../constants';

const applyFiltersAdapter = (applyFilters) => ({ name, values }) => applyFilters(name, values);

const filterByPermissions = (stripes) => (item) => {
  if (item === EXPORT_JOB_TYPE_KEYS.BULK_EDIT) {
    // show filter for bulk-edit only if user has at least one of the bulk permissions
    return Object.values(BULK_PERMISSIONS).some(permission => stripes.hasPerm(permission));
  }

  return true;
};

const mapJobTypeValues = (values, stripes) => {
  return values.reduce((acc, value) => {
    // remove unsupported job types
    if (!EXPORT_JOB_TYPES.filter(filterByPermissions(stripes)).includes(value)) {
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
const typeFilterOptions = (stripes) => EXPORT_JOB_TYPES
  .filter(filterByPermissions(stripes))
  .map(type => ({
    value: type,
    label: <FormattedMessage id={`ui-export-manager.exportJob.type.${type}`} />,
  }));

export const ExportJobsFilters = ({
  activeFilters,
  applyFilters,
  disabled,
}) => {
  const stripes = useStripes();

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
        onChange={({ name, values }) => adaptedApplyFilters({ name, values: mapJobTypeValues(values, stripes) })}
        options={typeFilterOptions(stripes)}
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

ExportJobsFilters.defaultProps = {
  disabled: false,
};
