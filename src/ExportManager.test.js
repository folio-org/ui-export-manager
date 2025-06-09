import '@folio/stripes-acq-components/test/jest/__mock__';

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { runAxeTest } from '@folio/stripes-testing';
import { useStripes } from '@folio/stripes/core';

import { ExportManager } from './ExportManager';

jest.mock('./ExportJobs', () => ({ ExportJobs: () => <span>ExportJobs</span> }));
jest.mock('./ExportEdiJobs', () => ({ ExportEdiJobs: () => <span>ExportEdiJobs</span> }));

const renderExportManager = (path) => (render(
  <MemoryRouter
    initialEntries={[path]}
    initialIndex={0}
  >
    <ExportManager />
  </MemoryRouter>,
));

const stripesMock = {
  hasInterface: jest.fn(() => true),
};

describe('ExportManager', () => {
  beforeEach(() => {
    useStripes.mockReturnValue(stripesMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be display ExportJobs when path is /export-manager/jobs', () => {
    const { getByText } = renderExportManager('/export-manager/jobs');

    expect(getByText('ExportJobs')).toBeDefined();
  });

  it('should be display ExportJobs when path is /export-manager/jobs/:id', () => {
    const { getByText } = renderExportManager('/export-manager/jobs/5');

    expect(getByText('ExportJobs')).toBeDefined();
  });

  it('should redirect to ExportJobs when path is /', () => {
    const { getByText } = renderExportManager('/');

    expect(getByText('ExportJobs')).toBeDefined();
  });

  it('should render with no axe errors when pass is /export-manager/jobs', async () => {
    const { container } = renderExportManager('/export-manager/jobs');

    await runAxeTest({
      rootNode: container,
    });
  });

  it('should render with no axe errors when pass is /', async () => {
    const { container } = renderExportManager('/');

    await runAxeTest({
      rootNode: container,
    });
  });

  it('should render with no axe errors when pass is /export-manager/jobs/:id', async () => {
    const { container } = renderExportManager('/export-manager/jobs/:id');

    await runAxeTest({
      rootNode: container,
    });
  });

  it('should render Organizations EDI Jobs when path is /export-manager/edi-jobs', () => {
    const { getByText } = renderExportManager('/export-manager/edi-jobs');

    expect(getByText('ExportEdiJobs')).toBeInTheDocument();
  });

  it('should redirect to ExportJobs when path is /export-manager/edi-jobs and stripes does not have organizations interface', () => {
    stripesMock.hasInterface.mockReturnValue(false);

    const { getByText } = renderExportManager('/export-manager/edi-jobs');

    expect(getByText('ExportJobs')).toBeInTheDocument();
  });
});
