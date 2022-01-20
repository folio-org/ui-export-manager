import { useInfiniteQuery } from 'react-query';
import queryString from 'query-string';

import { useOkapiKy, useNamespace } from '@folio/stripes/core';
import {
  buildDateRangeQuery,
  makeQueryBuilder,
} from '@folio/stripes-acq-components';

const RESULT_COUNT_INCREMENT = 30;

const buildJobsQuery = makeQueryBuilder(
  'type="EDIFACT_ORDERS_EXPORT"',
  (query) => {
    return `name="*${query}*" or description="*${query}*`;
  },
  'sortby name/sort.descending',
  {
    endTime: buildDateRangeQuery.bind(null, ['endTime']),
    startTime: buildDateRangeQuery.bind(null, ['startTime']),
    vendorId: (id) => `jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.vendorId=="${id}"`,
    exportConfigId: (id) => `jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.exportConfigId=="${id}"`,
  },
  {
    jobId: 'name',
  },
);

export const useExportEdiJobsQuery = (search) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'export-edi-jobs' });

  const {
    fetchNextPage,
    isLoading,
    data = {},
    refetch,
  } = useInfiniteQuery({
    queryKey: [namespace, search],
    queryFn: async ({ pageParam = 0 }) => {
      const kyOptions = {
        searchParams: {
          limit: RESULT_COUNT_INCREMENT,
          offset: pageParam * RESULT_COUNT_INCREMENT,
          query: buildJobsQuery(queryString.parse(`${search}&type=EDIFACT_ORDERS_EXPORT`)),
        },
      };

      const response = await ky.get('data-export-spring/jobs', kyOptions).json();

      return { ...response, nextPage: pageParam + 1 };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const pages = data.pages || [];

  return {
    loadMore: fetchNextPage,
    isLoading,
    exportEdiJobs: pages.reduce((acc, page) => {
      if (!page.jobRecords) {
        return acc;
      }

      return acc.concat(page.jobRecords);
    }, []),
    totalCount: pages[0]?.totalRecords,
    refetch,
  };
};
