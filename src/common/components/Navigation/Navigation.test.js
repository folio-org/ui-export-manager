import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';

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
});
