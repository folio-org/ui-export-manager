import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import { runAxeTest } from '@folio/stripes-testing';

import ExportManagerSettings from './ExportManagerSettings';

const defaultProps = {
  stripes: {
    hasPerm: jest.fn(() => true),
    connect: (Component) => Component,
  },
  location: {
    pathname: '/settings/export-manager',
    search: '',
  },
  match: {
    path: '/settings/export-manager',
    params: {},
  },
};

const renderExportManagerSettings = (props = {}) => render(
  <ExportManagerSettings
    {...defaultProps}
    {...props}
  />,
  { wrapper: MemoryRouter }
);

describe('ExportManagerSettings', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render export manager settings', () => {
    renderExportManagerSettings();

    expect(screen.getByText('ui-export-manager.settings.jobs')).toBeInTheDocument();
  });

  it('should render with no axe errors', async () => {
    const { container } = renderExportManagerSettings();

    await runAxeTest({ rootNode: container });
  });
});
