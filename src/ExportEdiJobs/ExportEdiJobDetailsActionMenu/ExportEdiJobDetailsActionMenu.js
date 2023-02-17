import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { pick } from 'lodash';

import {
  IfPermission,
  useOkapiKy,
} from '@folio/stripes/core';
import {
  Button,
  Icon,
  MenuSection,
} from '@folio/stripes/components';
import {
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  EXPORT_JOBS_API,
} from '../../common/constants';
import { useExportJobScheduler, useSecureDownload } from '../../common/hooks';
import { useNavigation } from '../../hooks';

export const ExportEdiJobDetailsActionMenu = ({
  exportJob,
  isRerunDisabled,
  onToggle,
  refetchJobs,
}) => {
  const ky = useOkapiKy();
  const showCallout = useShowCallout();
  const { scheduleExportJob } = useExportJobScheduler();
  const { navigateToEdiJobDetails } = useNavigation();

  const {
    id: jobId,
    name,
    fileNames,
  } = exportJob;
  const { download: downloadSecurely } = useSecureDownload(jobId);

  const onRerun = useCallback(
    () => {
      onToggle();
      scheduleExportJob(pick(exportJob, ['type', 'exportTypeSpecificParameters']))
        .then(({ id }) => {
          showCallout({
            messageId: 'ui-export-manager.exportJob.details.action.rerun.success',
            values: { name },
          });
          refetchJobs();
          navigateToEdiJobDetails(id);
        })
        .catch(() => {
          showCallout({
            messageId: 'ui-export-manager.exportJob.details.action.rerun.error',
            type: 'error',
            values: { name },
          });
        });
    },
    [
      exportJob,
      name,
      navigateToEdiJobDetails,
      onToggle,
      refetchJobs,
      scheduleExportJob,
      showCallout,
    ],
  );

  const onDownload = () => {
    onToggle();
    downloadSecurely();
  };

  const onResend = useCallback(async () => {
    onToggle();

    return ky.post(`${EXPORT_JOBS_API}/${exportJob.id}/resend`)
      .then(() => {
        showCallout({
          messageId: 'ui-export-manager.exportJob.details.action.resend.success',
        });
      })
      .catch(() => {
        showCallout({
          messageId: 'ui-export-manager.exportJob.details.action.resend.error',
          type: 'error',
        });
      });
  }, [exportJob.id, ky, onToggle, showCallout]);

  return (
    <MenuSection id="export-edi-job-details-actions">
      <IfPermission perm="data-export.job.item.post">
        <Button
          data-testid="job-action-rerun"
          buttonStyle="dropdownItem"
          disabled={isRerunDisabled}
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

      {
        fileNames?.length > 0 && (
          <>
            <IfPermission perm="data-export.job.item.download">
              <Button
                data-testid="job-action-download"
                buttonStyle="dropdownItem"
                onClick={onDownload}
              >
                <Icon
                  size="small"
                  icon="download"
                >
                  <FormattedMessage id="ui-export-manager.exportJob.details.action.download" />
                </Icon>
              </Button>
            </IfPermission>

            <IfPermission perm="data-export.job.item.resend">
              <Button
                data-testid="job-action-resend"
                buttonStyle="dropdownItem"
                onClick={onResend}
              >
                <Icon
                  size="small"
                  icon="envelope"
                >
                  <FormattedMessage id="ui-export-manager.exportJob.details.action.resend" />
                </Icon>
              </Button>
            </IfPermission>
          </>
        )
      }
    </MenuSection>
  );
};

ExportEdiJobDetailsActionMenu.propTypes = {
  exportJob: PropTypes.object.isRequired,
  isRerunDisabled: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  refetchJobs: PropTypes.func.isRequired,
};
