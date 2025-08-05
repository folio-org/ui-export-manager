import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

import {
  Label,
  Loading,
} from '@folio/stripes/components';
import {
  TextField,
  validateRequiredPositiveNumber,
} from '@folio/stripes-acq-components';

import { getExportTypeLabel } from '../../utils';

import css from './JobDeletionIntervals.css';

const parseInterval = (value) => (value ? Number(value) : undefined);

export const JobDeletionIntervals = ({
  disabled,
  fields,
  isLoading,
  isNonInteractive,
}) => {
  const intl = useIntl();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={css.list}>
      {fields.map((name, index) => {
        const exportType = fields.value[index]?.exportType;
        const label = getExportTypeLabel(exportType, intl);

        return (
          <>
            <Label
              key={name}
              htmlFor={name}
              className={css.fieldLabel}
            >
              {label}
            </Label>
            <Field
              key={name}
              id={name}
              component={TextField}
              disabled={disabled}
              isNonInteractive={isNonInteractive}
              name={`${name}.retentionDays`}
              parse={parseInterval}
              format={parseInterval}
              validate={validateRequiredPositiveNumber}
              type="number"
            />
          </>
        );
      })}
    </div>
  );
};

JobDeletionIntervals.propTypes = {
  disabled: PropTypes.bool,
  fields: PropTypes.shape({
    map: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.shape({
      exportType: PropTypes.string,
      retentionDays: PropTypes.number,
    })),
  }).isRequired,
  isLoading: PropTypes.bool,
  isNonInteractive: PropTypes.bool,
};
