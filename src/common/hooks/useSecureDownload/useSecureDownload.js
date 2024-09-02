import { useOkapiKy } from '@folio/stripes/core';

import {
  downloadBase64,
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  EXPORT_JOBS_API,
} from '../../constants';

export const useSecureDownload = (jobId) => {
  const ky = useOkapiKy();
  const showCallout = useShowCallout();

  const downloadSingleFile = async (fileName, parameterized) => {
    const key = parameterized ? `key=${encodeURIComponent(fileName)}` : '';

    return ky.get(`${EXPORT_JOBS_API}/${jobId}/download?${key}`, {
      headers: { accept: 'application/octet-stream' },
    })
      .blob()
      .then(data => {
        downloadBase64(fileName.replace(`${jobId}/`, ''), URL.createObjectURL(data));
      })
      .catch(() => {
        showCallout({
          messageId: 'ui-export-manager.exportJob.details.action.download.error',
          type: 'error',
        });
      });
  };

  const download = async (fileNames, parameterized) => {
    return Promise.all(fileNames.map((fileName) => downloadSingleFile(fileName, parameterized)));
  }

  return { download };
};
