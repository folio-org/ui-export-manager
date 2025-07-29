import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  Button,
  Col,
  Pane,
  PaneFooter,
  PaneHeader,
  Row,
} from '@folio/stripes/components';
import { TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';
import { usePaneFocus } from '@folio/stripes-acq-components';

import { DELETION_INTERVALS_FIELD_ARRAY_NAME } from '../../constants';
import { JobDeletionIntervals } from '../JobDeletionIntervals';

import css from './JobsSettingsForm.css';

const JobsSettingsForm = ({
  disabled,
  form,
  handleSubmit,
  isLoading,
  isNonInteractive,
}) => {
  const intl = useIntl();
  const { paneTitleRef } = usePaneFocus();

  const {
    pristine,
    submitting,
  } = form.getState();

  const isSubmitDisabled = pristine || submitting || isNonInteractive || disabled;
  const paneTitle = intl.formatMessage({ id: 'ui-export-manager.settings.jobs' });

  const renderHeader = useCallback((headerProps) => (
    <PaneHeader
      {...headerProps}
      paneTitle={paneTitle}
    />
  ), [paneTitle]);

  const footerEnd = (
    <Row>
      <Col xs>
        <Button
          buttonStyle="primary"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          marginBottom0
        >
          <FormattedMessage id="stripes-acq-components.button.save" />
        </Button>
      </Col>
    </Row>
  );

  return (
    <Pane
      id="export-manager-jobs-settings"
      defaultWidth="fill"
      footer={<PaneFooter renderEnd={footerEnd} />}
      paneTitleRef={paneTitleRef}
      renderHeader={renderHeader}
    >
      <TitleManager record={paneTitle} />

      <form id="export-manager-jobs-settings-form">
        <fieldset>
          <legend className={css.legend}>
            <FormattedMessage id="ui-export-manager.settings.jobs.deletionIntervals" />
          </legend>

          <FieldArray
            component={JobDeletionIntervals}
            disabled={disabled}
            isLoading={isLoading}
            isNonInteractive={isNonInteractive}
            name={DELETION_INTERVALS_FIELD_ARRAY_NAME}
          />
        </fieldset>
      </form>
    </Pane>
  );
};

JobsSettingsForm.propTypes = {
  disabled: PropTypes.bool,
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isNonInteractive: PropTypes.bool,
};

export default stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(JobsSettingsForm);
