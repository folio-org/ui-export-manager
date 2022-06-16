import React from 'react';
import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';

import styles from './ExportJobId.css';

export const ExportJobId = ({ jobId, files, entityType }) => {
  const stripes = useStripes();

  const hasCsvAnyPerms = stripes.hasPerm('ui-bulk-edit.view') || stripes.hasPerm('ui-bulk-edit.edit');
  const hasInAppAnyPerms = stripes.hasPerm('ui-bulk-edit.app-view') || stripes.hasPerm('ui-bulk-edit.app-edit');

  const showUsersLink = hasCsvAnyPerms && entityType === 'USER';
  const showItemsLink = hasInAppAnyPerms && entityType === 'ITEM';
  const showAnyLink = (hasCsvAnyPerms && hasInAppAnyPerms) || (!['USER', 'ITEM'].includes(entityType));

  const isShowLink = showUsersLink || showItemsLink || showAnyLink;

  const downloadFiles = (e) => {
    e.stopPropagation();
    files.forEach((file) => {
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
    });
  };

  return (
    files?.length && isShowLink ? (
      <button
        type="button"
        className={styles.exportJobIdButton}
        onClick={downloadFiles}
      >
        {jobId}
      </button>
    ) : (
      <span>{jobId}</span>
    )
  );
};

ExportJobId.propTypes = {
  jobId: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.string),
  entityType: PropTypes.string,
};
