import { Form } from 'react-final-form';
import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import { runAxeTest } from '@folio/stripes-testing';

import {
  DELETION_INTERVALS_FIELD_ARRAY_NAME,
  TRANSLATION_KEYS_DICT,
} from '../../constants';
import { JobDeletionIntervals } from './JobDeletionIntervals';

const jobDeletionIntervals = Object.keys(TRANSLATION_KEYS_DICT).map((key) => ({
  exportType: key,
  retentionDays: 7,
}));

const defaultProps = {
  fields: {
    value: jobDeletionIntervals,
    map: (fn) => jobDeletionIntervals.map((_, i) => fn(`${DELETION_INTERVALS_FIELD_ARRAY_NAME}[${i}]`, i)),
  },
  disabled: false,
  isLoading: false,
  isNonInteractive: false,
};

const wrapper = ({ children }) => (
  <MemoryRouter>
    <Form
      onSubmit={jest.fn()}
      render={() => {
        return (
          <div>
            {children}
          </div>
        );
      }}
    />
  </MemoryRouter>
);

const renderJobDeletionIntervals = (props = {}) => render(
  <JobDeletionIntervals
    {...defaultProps}
    {...props}
  />,
  { wrapper },
);

describe('JobDeletionIntervals', () => {
  it('should render fields for each job deletion interval', () => {
    renderJobDeletionIntervals();

    Object.values(TRANSLATION_KEYS_DICT).forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it('should render with no axe errors', async () => {
    const { container } = renderJobDeletionIntervals();

    await runAxeTest({ rootNode: container });
  });
});
