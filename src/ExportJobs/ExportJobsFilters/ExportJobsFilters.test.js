import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import {
  EXPORT_JOB_STATUSES,
  EXPORT_JOB_TYPES,
} from '../constants';

import { ExportJobsFilters } from './ExportJobsFilters';

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    AcqDateRangeFilter: jest.fn(({ labelId }) => <span>{labelId}</span>),
    AcqCheckboxFilter: jest.fn(({ options, labelId }) => (
      <>
        <span>{labelId}</span>
        {options.map(({ value }) => <span key={value}>{value}</span>)}
      </>
    )),
    BooleanFilter: jest.fn(({ labelId }) => <span>{labelId}</span>),
    PluggableUserFilter: jest.fn(({ labelId }) => <span>{labelId}</span>),
  };
});

const defaultProps = {
  activeFilters: {},
  applyFilters: jest.fn(),
  disabled: false,
};

const renderExportJobsFilters = ({
  activeFilters,
  applyFilters,
  disabled,
} = defaultProps) => (render(
  <ExportJobsFilters
    activeFilters={activeFilters}
    applyFilters={applyFilters}
    disabled={disabled}
  />,
));

describe('ExportJobsFilters', () => {
  it('should display filter by status', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.status')).toBeDefined();

    Object.values(EXPORT_JOB_STATUSES)
      .forEach((type) => expect(getByText(type)).toBeDefined());
  });

  it('should display filter by type', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.type')).toBeDefined();

    Object.values(EXPORT_JOB_TYPES)
      .forEach((type) => expect(getByText(type)).toBeDefined());
  });

  it('should display filter by system source', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.system')).toBeDefined();
  });

  it('should display filter by source', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.source')).toBeDefined();
  });

  it('should display filter by start time', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.startTime')).toBeDefined();
  });

  it('should display filter by end time', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.endTime')).toBeDefined();
  });
});
