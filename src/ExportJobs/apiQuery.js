export const useExportJobsQuery = () => {
  return {
    isLoading: false,
    exportJobs: [
      {
        id: 1,
        jobId: '101',
        status: 'In progress',
        type: 'circulation',
        source: 'Admin, Diku',
        startTime: '2020-08-13T12:21:21.123+00:00',
      },
      {
        id: 2,
        jobId: '102',
        status: 'Successful',
        type: 'bursar',
        description: '# of charges: 20',
        source: 'System',
        startTime: '2020-08-12T12:21:21.123+00:00',
        endTime: '2020-08-12T12:25:21.123+00:00',
        files: [
          '/img/tenant-assets/opentown-libraries-logo.c96ff678691e1a345321b50941335d81.png',
          '/img/tenant-assets/opentown-libraries-logo.c96ff678691e1a345321b50941335d81.png',
        ],
      },
      {
        id: 3,
        jobId: '103',
        status: 'Scheduled',
        type: 'bursar',
        source: 'System',
      },
      {
        id: 4,
        jobId: '104',
        status: 'Failed',
        type: 'circulation',
        source: 'Admin, Diku',
        startTime: '2020-08-15T12:21:21.123+00:00',
        endTime: '2020-08-15T12:25:21.123+00:00',
      },
    ],
  };
};
