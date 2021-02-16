import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Col,
  KeyValue,
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
    exportJob,
  } = useExportJobQuery(uuid);

  const title = formatMessage(
    { id: 'ui-export-manager.exportJob' },
    { jobId: exportJob.jobId },
  );

  return (
    <Pane
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
              jobId={exportJob.jobId}
              files={exportJob.files}
            />
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue
            label={formatMessage({ id: 'ui-export-manager.exportJob.status' })}
            value={formatMessage({ id: `ui-export-manager.exportJob.status.${exportJob.status}` })}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={formatMessage({ id: 'ui-export-manager.exportJob.type' })}
            value={formatMessage({ id: `ui-export-manager.exportJob.type.${exportJob.type}` })}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={formatMessage({ id: 'ui-export-manager.exportJob.outputType' })}
            value={exportJob.outputType}
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
            value={exportJob.source}
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
