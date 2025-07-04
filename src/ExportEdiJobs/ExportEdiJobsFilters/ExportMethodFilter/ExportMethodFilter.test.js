import { render } from '@folio/jest-config-stripes/testing-library/react';
import { runAxeTest } from '@folio/stripes-testing';

import Filter from './ExportMethodFilter';

jest.mock('./useConfigs', () => ({
  useConfigs: jest.fn().mockReturnValue({ isFetching: false, configs: [] }),
}));

const filterAccordionTitle = 'labelId';

const renderFilter = () => (render(
  <Filter
    id="filterId"
    activeFilters={[]}
    name="filterName"
    onChange={jest.fn()}
    labelId={filterAccordionTitle}
  />,
));

describe('ExportMethodFilter', () => {
  it('should display passed title', () => {
    const { getByText } = renderFilter();

    expect(getByText(filterAccordionTitle)).toBeDefined();
  });

  it('should be closed by default', () => {
    const { getByLabelText } = renderFilter();

    expect(getByLabelText(`${filterAccordionTitle} filter list`).getAttribute('aria-expanded') || 'false').toBe('false');
  });

  it('should render with no axe errors', async () => {
    renderFilter();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
