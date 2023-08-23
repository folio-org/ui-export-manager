import React from 'react';
import PropTypes from 'prop-types';

import { TextLink } from '@folio/stripes/components';

import { useExportManagerPerms, useSecureDownload } from '../../hooks';
import { EXPORTED_JOB_TYPES } from '../../constants';
import { BULK_ENTITY_TYPES } from '../../../ExportJobs/constants';

export const ExportJobId = ({ job }) => {
  const { id, name: jobId, files, fileNames, entityType, type: jobType } = job;

  const perms = useExportManagerPerms();
  const { download: downloadSecurely } = useSecureDownload(id);

  const {
    hasAnyUserEditPerms,
    hasInAppAnyPerms,
    hasAllExportManagerPerms,
  } = perms;

  const itemsAndHoldings = [BULK_ENTITY_TYPES.ITEM, BULK_ENTITY_TYPES.HOLDINGS_RECORD];
  const showUsersLink = hasAnyUserEditPerms && entityType === BULK_ENTITY_TYPES.USER;
  const showItemsLink = hasInAppAnyPerms && itemsAndHoldings.includes(entityType);
  const showAnyLink = hasAllExportManagerPerms && ((hasAnyUserEditPerms && hasInAppAnyPerms)
      || (![BULK_ENTITY_TYPES.USER, ...itemsAndHoldings].includes(entityType)));
  const isShowLink = showUsersLink || showItemsLink || showAnyLink;

  const canDownloadFile = files?.length && isShowLink;

  const downloadFiles = (e) => {
    e.stopPropagation();

    if (EXPORTED_JOB_TYPES.includes(jobType)) {
      downloadSecurely(fileNames[0]);
    } else {
      files.forEach((file, index) => {
        if (file && index !== 2) {
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
    canDownloadFile ? (
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
