import React from 'react';
import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';
import { TextLink } from '@folio/stripes/components';

import { useSecureDownload } from '../../hooks';

export const ExportJobId = ({ job }) => {
  const { id, name: jobId, files, entityType, type: jobType, startTime, exportTypeSpecificParameters } = job;

  const stripes = useStripes();
  const { download: downloadSecurely } = useSecureDownload(id);

  const hasCsvAnyPerms = stripes.hasPerm('ui-bulk-edit.view') || stripes.hasPerm('ui-bulk-edit.edit');
  const hasInAppAnyPerms = stripes.hasPerm('ui-bulk-edit.app-view') || stripes.hasPerm('ui-bulk-edit.app-edit');

  const showUsersLink = hasCsvAnyPerms && entityType === 'USER';
  const showItemsLink = hasInAppAnyPerms && entityType === 'ITEM';
  const showAnyLink = (hasCsvAnyPerms && hasInAppAnyPerms) || (!['USER', 'ITEM'].includes(entityType));
  const isShowLink = showUsersLink || showItemsLink || showAnyLink;

  const downloadFiles = (e) => {
    e.stopPropagation();

    if (jobType === 'E_HOLDINGS') {
      const timestamp = new Date(startTime).toISOString();
      const recordId = exportTypeSpecificParameters?.eHoldingsExportConfig?.recordId;
      const recordType = exportTypeSpecificParameters?.eHoldingsExportConfig?.recordType?.toLowerCase();

      downloadSecurely(`${timestamp}_${recordId}_${recordType}.csv`);
    } else {
      files.forEach((file) => {
        if (file) {
          const link = document.createElement('a');

          link.href = file;
          link.download = jobId;
          link.target = '_blank';

          document.body.appendChild(link);

          link.dispatchEvent(
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window,
            }),
          );

          document.body.removeChild(link);
        }
      });
    }
  };

  return (
    files?.length && isShowLink ? (
      <TextLink
        onClick={downloadFiles}
        data-testid="text-link"
      >
        {jobId}
      </TextLink>
    ) : (
      <span>{jobId}</span>
    )
  );
};

ExportJobId.propTypes = {
  job: PropTypes.object.isRequired,
};
