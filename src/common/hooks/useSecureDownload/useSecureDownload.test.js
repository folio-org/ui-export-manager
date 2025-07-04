import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';
import {
  downloadBase64,
  useShowCallout,
} from '@folio/stripes-acq-components';

import { useSecureDownload } from './useSecureDownload';

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    downloadBase64: jest.fn(),
    useShowCallout: jest.fn(() => jest.fn()),
  };
});

const jobId = 'uid';
const toastMessage = type => `ui-export-manager.exportJob.details.action.${type}`;

describe('useSecureDownload', () => {
  const kyGetMock = jest.fn(() => ({
    blob: () => Promise.resolve(),
  }));
  const showCallout = jest.fn();

  beforeEach(() => {
    downloadBase64.mockClear();
    kyGetMock.mockClear();
    showCallout.mockClear();

    useShowCallout.mockClear().mockReturnValue(showCallout);

    useOkapiKy.mockClear().mockReturnValue({
      get: kyGetMock,
    });
  });

  it('should make get request to download file', async () => {
    const { result } = renderHook(
      () => useSecureDownload(jobId),
    );

    await result.current.download(['fileName.csv']);

    expect(kyGetMock).toHaveBeenCalled();
  });

  it('should handle export job download error', async () => {
    kyGetMock.mockReturnValue({ blob: () => Promise.reject() });

    const { result } = renderHook(
      () => useSecureDownload(jobId),
    );

    await result.current.download(['fileName.csv']);

    expect(showCallout).toHaveBeenCalledWith(expect.objectContaining({
      messageId: toastMessage`download.error`,
    }));
  });
});
