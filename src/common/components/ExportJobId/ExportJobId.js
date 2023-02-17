import React from 'react';
import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';
import { TextLink } from '@folio/stripes/components';

import { useSecureDownload } from '../../hooks';
import { EXPORTED_JOB_TYPES } from '../../constants';

export const ExportJobId = ({ job }) => {
  const { id, name: jobId, files, fileNames, entityType, type: jobType } = job;

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

    if (EXPORTED_JOB_TYPES.includes(jobType)) {
      downloadSecurely(fileNames[0]);
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
