import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Col,
  KeyValue,
  LoadingPane,
  Pane,
  Row,
} from '@folio/stripes/components';
import {
  FolioFormattedTime,
} from '@folio/stripes-acq-components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import { ExportJobId } from '../common/components';
import { useNavigation } from '../hooks';

import { useExportJobQuery } from './apiQuery';

export const ExportJob = ({ uuid }) => {
  const { formatMessage } = useIntl();
  const { navigateToJobs } = useNavigation();

  const {
    isLoading,
    exportJob,
  } = useExportJobQuery(uuid);

  const title = formatMessage(
    { id: 'ui-export-manager.exportJob' },
    { jobId: exportJob.jobId },
  );

  if (isLoading) {
    return (
      <LoadingPane
        data-testid="export-job-loading"
        paneTitle={title}
        defaultWidth="fill"
        dismissible
        onClose={navigateToJobs}
      />
    );
  }

  return (
    <Pane
      data-testid="export-job"
      paneTitle={title}
      defaultWidth="fill"
      dismissible
      onClose={navigateToJobs}
    >
      <Row>
        <Col xs={12}>
          {exportJob.metadata && <ViewMetaData metadata={exportJob.metadata} />}
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <KeyValue label={formatMessage({ id: 'ui-export-manager.exportJob.jobId' })}>
            <ExportJobId
              jobId={exportJob.name}
              files={exportJob.files}
              entityType={exportJob.entityType}
            />
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue
            label={formatMessage({ id: 'ui-export-manager.exportJob.status' })}
            value={
              exportJob.status
              && formatMessage({ id: `ui-export-manager.exportJob.status.${exportJob.status}` })
            }
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={formatMessage({ id: 'ui-export-manager.exportJob.type' })}
            value={
              exportJob.type
              && formatMessage({ id: `ui-export-manager.exportJob.type.${exportJob.type}`, defaultMessage: exportJob.type })
            }
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={formatMessage({ id: 'ui-export-manager.exportJob.outputType' })}
            value={exportJob.outputFormat}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <KeyValue
            label={formatMessage({ id: 'ui-export-manager.exportJob.description' })}
            value={exportJob.description}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <KeyValue
            label={formatMessage({ id: 'ui-export-manager.exportJob.source' })}
            value={
              exportJob.isSystemSource
                ? formatMessage({ id: 'ui-export-manager.exportJob.system' })
                : exportJob.source
            }
          />
        </Col>

        <Col xs={3}>
          <KeyValue label={formatMessage({ id: 'ui-export-manager.exportJob.startTime' })}>
            <FolioFormattedTime dateString={exportJob.startTime} />
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue label={formatMessage({ id: 'ui-export-manager.exportJob.endTime' })}>
            <FolioFormattedTime dateString={exportJob.endTime} />
          </KeyValue>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <KeyValue
            label={formatMessage({ id: 'ui-export-manager.exportJob.errorDetails' })}
            value={exportJob.errorDetails}
          />
        </Col>
      </Row>
    </Pane>
  );
};

ExportJob.propTypes = {
  uuid: PropTypes.string.isRequired,
};
