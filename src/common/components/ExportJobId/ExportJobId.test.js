import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { ExportJobId } from './ExportJobId';

const renderExportJobId = (jobId, files = []) => render(
  <ExportJobId
    jobId={jobId}
    files={files}
  />,
);

describe('BursarExportsManualRunner', () => {
  it('should render job id as a text when no files provided', () => {
    const jobId = '1001';
    const { getByText, queryByRole } = renderExportJobId(jobId);

    expect(getByText(jobId)).toBeDefined();
    expect(queryByRole('button')).toBeNull();
  });

  it('should render job id as a button when files are provided', () => {
    const jobId = '1001';
    const { getByText, getByRole } = renderExportJobId(jobId, ['/test.png']);

    expect(getByText(jobId)).toBeDefined();
    expect(getByRole('button')).toBeDefined();
  });
});
