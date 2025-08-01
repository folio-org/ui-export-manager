import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import { TRANSLATION_KEYS_DICT } from '../../constants';
import JobsSettingsForm from './JobsSettingsForm';

jest.mock('react-final-form-arrays', () => ({
  ...jest.requireActual('react-final-form-arrays'),
  FieldArray: jest.fn(() => <div>FieldArray</div>),
}));

const jobDeletionIntervals = Object.keys(TRANSLATION_KEYS_DICT).map((key) => ({
  exportType: key,
  retentionDays: 7,
}));

const defaultProps = {
  initialValues: { jobDeletionIntervals },
  onSubmit: jest.fn(),
};

const renderJobsSettingsForm = (props = {}) => render(
  <JobsSettingsForm
    {...defaultProps}
    {...props}
  />,
  { wrapper: MemoryRouter }
);

describe('JobsSettings', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render field array', () => {
    renderJobsSettingsForm();

    expect(screen.getByText('FieldArray')).toBeInTheDocument();
  });
});
