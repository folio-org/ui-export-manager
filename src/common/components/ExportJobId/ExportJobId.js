import PropTypes from 'prop-types';

import { TextLink } from '@folio/stripes/components';

import { MULTIPLE_EXPORTED_JOB_TYPES } from '../../constants';
import {
  useExportManagerPerms,
  useSecureDownload,
} from '../../hooks';

export const ExportJobId = ({ job }) => {
  const {
    files,
    fileNames,
    id,
    name: jobId,
    type: jobType,
  } = job;

  const { hasAllExportManagerPerms } = useExportManagerPerms();
  const { download: downloadSecurely } = useSecureDownload(id);

  const canDownloadFile = files?.length && hasAllExportManagerPerms;

  const downloadFiles = (e) => {
    e.stopPropagation();

    if (fileNames?.length) {
      downloadSecurely(fileNames, MULTIPLE_EXPORTED_JOB_TYPES.includes(jobType));
    } else {
      files.forEach((file, index) => {
        if (file && index !== 2) {
          const link = document.createElement('a');

          link.href = file;
          link.download = jobId;

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
