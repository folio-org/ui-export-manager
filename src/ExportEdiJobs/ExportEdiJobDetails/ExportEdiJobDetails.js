import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Col,
  KeyValue,
  Loading,
  LoadingPane,
  Pane,
  Row,
} from '@folio/stripes/components';
import {
  FolioFormattedTime,
  useOrganization,
} from '@folio/stripes-acq-components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import { ExportJobId } from '../../common/components';
import { useNavigation } from '../../hooks';

import { useExportJobQuery } from '../../ExportJob/apiQuery';

export const ExportEdiJobDetails = ({ uuid }) => {
  const { formatMessage } = useIntl();
  const { navigateToEdiJobs } = useNavigation();

  const {
    isLoading,
    exportJob,
  } = useExportJobQuery(uuid);

  const exportConfig = exportJob
    ?.exportTypeSpecificParameters
    ?.vendorEdiOrdersExportConfig;

  const {
    organization,
    isLoading: isOrganizationLoading,
  } = useOrganization(exportConfig?.vendorId);

  const title = formatMessage(
    { id: 'ui-export-manager.exportJob' },
    { jobId: exportJob.jobId },
  );

  if (isLoading) {
    return (
      <LoadingPane
        data-testid="export-edi-job-loading"
        paneTitle={title}
        defaultWidth="fill"
        dismissible
        onClose={navigateToEdiJobs}
      />
    );
  }

  return (
    <Pane
      paneTitle={title}
      defaultWidth="fill"
      dismissible
      onClose={navigateToEdiJobs}
    >
      <Row>
        <Col xs={12}>
          {exportJob.metadata && <ViewMetaData metadata={exportJob.metadata} />}
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-export-manager.exportJob.jobId" />}>
            <ExportJobId
              jobId={exportJob.name}
              files={exportJob.files}
            />
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-export-manager.exportJob.status" />}
            value={
              exportJob.status
              && <FormattedMessage id={`ui-export-manager.exportJob.status.${exportJob.status}`} />
            }
          />
        </Col>

        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-export-manager.exportJob.startTime" />}>
            <FolioFormattedTime dateString={exportJob.startTime} />
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-export-manager.exportJob.endTime" />}>
            <FolioFormattedTime dateString={exportJob.endTime} />
          </KeyValue>
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-export-manager.exportJob.source" />}
            value={
              exportJob.isSystemSource
                ? <FormattedMessage id="ui-export-manager.exportJob.system" />
                : exportJob.source
            }
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-export-manager.exportJob.organization" />}
            value={isOrganizationLoading ? <Loading /> : organization?.name}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-export-manager.exportJob.exportMethod" />}
            value={exportConfig?.configName}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-export-manager.exportJob.description" />}
            value={exportJob.description}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-export-manager.exportJob.errorDetails" />}
            value={exportJob.errorDetails}
          />
        </Col>
      </Row>
    </Pane>
  );
};

ExportEdiJobDetails.propTypes = {
  uuid: PropTypes.string.isRequired,
};
