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

  const download = async (fileName) => {
    return ky.get(`${EXPORT_JOBS_API}/${jobId}/download`, {
      headers: { accept: 'application/octet-stream' },
    })
      .blob()
      .then(data => {
        downloadBase64(fileName, URL.createObjectURL(data));
      })
      .catch(() => {
        showCallout({
          messageId: 'ui-export-manager.exportJob.details.action.download.error',
          type: 'error',
        });
      });
  };

  return { download };
};
