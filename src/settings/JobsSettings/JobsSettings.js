import get from 'lodash/get';
import partition from 'lodash/partition';
import {
  useCallback,
  useMemo,
} from 'react';
import { useIntl } from 'react-intl';

import {
  TitleManager,
  useStripes,
} from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import { JobsSettingsForm } from './components';
import { DELETION_INTERVALS_FIELD_ARRAY_NAME } from './constants';
import {
  useJobDeletionIntervals,
  useJobDeletionIntervalsMutation,
} from './hooks';
import { getExportTypeLabel } from './utils';

const sortByExportType = (intl) => (a, b) => {
  const labelA = getExportTypeLabel(a.exportType, intl);
  const labelB = getExportTypeLabel(b.exportType, intl);

  return labelA.localeCompare(labelB);
};

const getChangedRows = (values, form) => {
  const formState = form.getState();
  const fieldNameRegExp = new RegExp(`^${DELETION_INTERVALS_FIELD_ARRAY_NAME}\\[\\d+\\]`);

  const dirtyArrayFields = Object.entries(formState.dirtyFields)
    .filter(([key, value]) => Boolean(value) && fieldNameRegExp.test(key))
    .map(([key]) => get(values, key.match(fieldNameRegExp)[0]));

  return dirtyArrayFields;
};

export const JobsSettings = () => {
  const intl = useIntl();
  const stripes = useStripes();
  const showCallout = useShowCallout();

  const isNonInteractive = !stripes.hasPerm('ui-export-manager.settings.edit');

  const {
    isFetching: isJobDeletionIntervalsLoading,
    jobDeletionIntervals,
    refetch,
  } = useJobDeletionIntervals();

  const {
    isLoading: isJobDeletionIntervalsMutating,
    updateJobDeletionIntervals,
  } = useJobDeletionIntervalsMutation();

  const onSubmit = useCallback(async (values, form) => {
    const data = getChangedRows(values, form);

    const settled = await updateJobDeletionIntervals({ data });

    partition(settled, (result) => result.status === 'fulfilled')
      .forEach((results, i) => {
        if (results.length) {
          showCallout({
            messageId: `ui-export-manager.settings.jobs.update.${i ? 'error' : 'success'}`,
            type: i ? 'error' : 'success',
            values: {
              count: results.length,
              entities: results.map((result) => getExportTypeLabel(result.exportType, intl)).join(', '),
            },
          });
        }
      });

    refetch();
  }, [intl, refetch, showCallout, updateJobDeletionIntervals]);

  const initialValues = useMemo(() => ({
    jobDeletionIntervals: jobDeletionIntervals.toSorted(sortByExportType(intl)),
  }), [intl, jobDeletionIntervals]);

  return (
    <TitleManager record={intl.formatMessage({ id: 'ui-export-manager.settings.jobs' })}>
      <JobsSettingsForm
        disabled={isJobDeletionIntervalsMutating}
        initialValues={initialValues}
        isLoading={isJobDeletionIntervalsLoading}
        isNonInteractive={isNonInteractive}
        onSubmit={onSubmit}
      />
    </TitleManager>
  );
};
