import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

import {
  Label,
  Loading,
} from '@folio/stripes/components';
import { TextField } from '@folio/stripes-acq-components';

import { getExportTypeLabel } from '../../utils';

import css from './JobDeletionIntervals.css';

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
      <div className={css.fieldLabel}>
        {fields.map((name, index) => {
          const exportType = fields.value[index]?.exportType;
          const label = getExportTypeLabel(exportType, intl);

          return (
            <Label
              key={name}
              htmlFor={name}
            >
              {label}
            </Label>
          );
        })}
      </div>
      <div className={css.fieldInput}>
        {fields.map((name) => {
          return (
            <Field
              key={name}
              id={name}
              component={TextField}
              disabled={disabled}
              isNonInteractive={isNonInteractive}
              name={`${name}.retentionDays`}
              parse={Number}
              format={Number}
              type="number"
            />
          );
        })}
      </div>
    </div>
  );
};
