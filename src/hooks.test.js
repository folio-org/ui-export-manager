import { useLocation } from 'react-router-dom';
import { renderHook } from '@testing-library/react-hooks';

import {
  useNavigation,
} from './hooks';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: jest.fn(() => ({})),
}));

describe('Export manager hooks', () => {
  beforeEach(() => {
    mockHistoryPush.mockClear();
  });

  describe('useNavigation', () => {
    it('should provide navigateTo util that navigates in export manager', () => {
      const search = '?isSystem=true';

      useLocation.mockClear().mockReturnValueOnce({ search });

      const { result } = renderHook(() => useNavigation());

      result.current.navigateTo('jobs');

      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/export-manager/jobs',
        search,
      });
    });

    it('should provide navigateToJobs util that navigates to export jobs', () => {
      const { result } = renderHook(() => useNavigation());

      result.current.navigateToJobs();

      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/export-manager/jobs',
      });
    });

    it('should provide navigateToJobDetails util that navigates to export job details', () => {
      const id = 4;
      const { result } = renderHook(() => useNavigation());

      result.current.navigateToJobDetails(id);

      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: `/export-manager/jobs/${id}`,
      });
    });
  });
});
