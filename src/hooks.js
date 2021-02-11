import { useCallback } from 'react';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';

export const useNavigation = () => {
  const history = useHistory();
  const location = useLocation();

  const navigateTo = useCallback((path) => {
    history.push({
      pathname: `/export-manager/${path}`,
      search: location.search,
    });
  }, [history, location.search]);

  const navigateToJobs = useCallback(() => {
    navigateTo('jobs');
  }, [navigateTo]);

  const navigateToJobDetails = useCallback((id) => {
    navigateTo(`jobs/${id}`);
  }, [navigateTo]);

  return {
    navigateTo,
    navigateToJobs,
    navigateToJobDetails,
  };
};
