import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';

import { runAxeTest } from '@folio/stripes-testing';
import Navigation from './Navigation';

const renderNavigation = (props) => render(
  <Navigation
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('Navigation', () => {
  it('should display tabs', () => {
    renderNavigation();

    expect(screen.getByText('ui-export-manager.navigation.all')).toBeDefined();
    expect(screen.getByText('ui-export-manager.navigation.organizations')).toBeDefined();
  });

  it('should render with no axe errors', async () => {
    renderNavigation();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
