import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { pick } from 'lodash';

import { IfPermission } from '@folio/stripes/core';
import {
  Button,
  Icon,
  MenuSection,
} from '@folio/stripes/components';
import { useShowCallout } from '@folio/stripes-acq-components';

import { useExportJobScheduler } from '../../common/hooks';
import { useNavigation } from '../../hooks';

export const ExportEdiJobDetailsActionMenu = ({
  exportJob,
  onToggle,
  refetchJobs,
}) => {
  const { scheduleExportJob } = useExportJobScheduler();
  const { navigateToEdiJobDetails } = useNavigation();
  const showCallout = useShowCallout();

  const onRerun = useCallback(
    () => {
      onToggle();
      scheduleExportJob(pick(exportJob, ['type', 'exportTypeSpecificParameters']))
        .then(({ id }) => {
          showCallout({
            messageId: 'ui-export-manager.exportJob.details.action.rerun.success',
            values: { name: exportJob.name },
          });
          refetchJobs();
          navigateToEdiJobDetails(id);
        })
        .catch(() => {
          showCallout({
            messageId: 'ui-export-manager.exportJob.details.action.rerun.error',
            type: 'error',
            values: { name: exportJob.name },
          });
        });
    },
    [
      exportJob,
      navigateToEdiJobDetails,
      onToggle,
      refetchJobs,
      scheduleExportJob,
      showCallout,
    ],
  );

  return (
    <MenuSection id="export-edi-job-details-actions">
      <IfPermission perm="data-export.job.item.post">
        <Button
          data-testid="job-action-rerun"
          buttonStyle="dropdownItem"
          onClick={onRerun}
        >
          <Icon
            size="small"
            icon="refresh"
          >
            <FormattedMessage id="ui-export-manager.exportJob.details.action.rerun" />
          </Icon>
        </Button>
      </IfPermission>
    </MenuSection>
  );
};

ExportEdiJobDetailsActionMenu.propTypes = {
  exportJob: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  refetchJobs: PropTypes.func.isRequired,
};
