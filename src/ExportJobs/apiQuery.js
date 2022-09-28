import { useInfiniteQuery } from 'react-query';
import queryString from 'query-string';

import { useOkapiKy } from '@folio/stripes/core';
import {
  buildDateRangeQuery,
  makeQueryBuilder,
} from '@folio/stripes-acq-components';

const buildJobsQuery = makeQueryBuilder(
  'cql.allRecords=1',
  (query) => {
    return `name="*${query}*" or description="*${query}*"`;
  },
  'sortby name/sort.descending',
  {
    endTime: buildDateRangeQuery.bind(null, ['endTime']),
    startTime: buildDateRangeQuery.bind(null, ['startTime']),
  },
  {
    jobId: 'name',
  },
);

export const useExportJobsQuery = (search, pagination) => {
  const ky = useOkapiKy();

  const {
    fetchNextPage,
    isLoading,
    data = {},
  } = useInfiniteQuery({
    queryKey: ['ui-export-manager', 'export-jobs', search],
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: pagination.limit,
          offset: pagination.offset,
          query: buildJobsQuery(queryString.parse(search)),
        },
      };

      const response = await ky.get('data-export-spring/jobs', kyOptions).json();

      return { ...response };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const pages = data.pages || [];

  return {
    loadMore: fetchNextPage,
    isLoading,
    exportJobs: pages.reduce((acc, page) => {
      if (!page.jobRecords) {
        return acc;
      }

      return acc.concat(page.jobRecords);
    }, []),
    totalCount: pages[0]?.totalRecords,
  };
};
