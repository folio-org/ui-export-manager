import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { runAxeTest } from '@folio/stripes-testing';
import '@folio/stripes-acq-components/test/jest/__mock__';

import { ExportManager } from './ExportManager';

jest.mock('./ExportJobs', () => {
  return {
    ExportJobs: () => <span>ExportJobs</span>,
  };
});

const renderExportManager = (path) => (render(
  <MemoryRouter
    initialEntries={[path]}
    initialIndex={0}
  >
    <ExportManager />
  </MemoryRouter>,
));

describe('ExportManager', () => {
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
});
