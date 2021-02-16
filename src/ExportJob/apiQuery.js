export const useExportJobQuery = () => {
  return {
    isLoading: false,
    exportJob: {
      metadata: {
        createdDate: '2020-08-12T12:18:21.123+00:00',
        updatedDate: '2020-08-12T12:18:21.123+00:00',
      },
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
  };
};
