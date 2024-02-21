import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { runAxeTest } from '@folio/stripes-testing';
import { useSecureDownload } from '../../hooks';
import { ExportJobId } from './ExportJobId';

const renderExportJobId = (job) => render(
  <ExportJobId job={job} />,
);

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useSecureDownload: jest.fn(),
}));

describe('ExportJobId', () => {
  const downloadSecurelyMock = jest.fn();

  beforeEach(() => {
    downloadSecurelyMock.mockClear();

    useSecureDownload.mockClear().mockReturnValue({
      download: downloadSecurelyMock,
    });
  });

  it('should render job id as a text when no files provided', () => {
    const jobName = '1001';
    const { getByText, queryByRole } = renderExportJobId({ name: jobName });

    expect(getByText(jobName)).toBeDefined();
    expect(queryByRole('button')).toBeNull();
  });

  it('should render job id as a button when files are provided', () => {
    const jobName = '1001';
    const { getByText, getByTestId } = renderExportJobId({
      name: jobName,
      files: ['/test.png'],
    });

    expect(getByText(jobName)).toBeDefined();
    expect(getByTestId('text-link')).toBeDefined();
  });

  it('should use secure download for eholdings exports', () => {
    const jobName = '1001';
    const { getByTestId } = renderExportJobId({
      name: jobName,
      files: ['/test.png'],
      fileNames: ['/test.png'],
      type: 'E_HOLDINGS',
    });

    user.click(getByTestId('text-link'));

    expect(downloadSecurelyMock).toHaveBeenCalled();
  });

  it('should not use secure download for bursar exports', () => {
    const jobName = '1001';
    const { getByTestId } = renderExportJobId({
      name: jobName,
      files: ['/test.png'],
      type: 'BURSAR_FEES_FINES',
    });

    user.click(getByTestId('text-link'));

    expect(downloadSecurelyMock).not.toHaveBeenCalled();
  });

  it('should render with no axe errors', async () => {
    const jobName = '1001';
    renderExportJobId({
      name: jobName,
      files: ['/test.png'],
      type: 'BURSAR_FEES_FINES',
    });

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
