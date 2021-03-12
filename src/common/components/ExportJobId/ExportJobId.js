import React from 'react';
import PropTypes from 'prop-types';

import styles from './ExportJobId.css';

export const ExportJobId = ({ jobId, files }) => {
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
    files?.length ? (
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
};
