import { createFileRoute } from '@tanstack/react-router';

import { PortfolioPage } from '@/components/portfolio-page';

export const Route = createFileRoute('/v2')({
  head: () => ({
    meta: [
      { title: 'Dr. Kalpana Sunil Thakre — Academic Portfolio' },
      {
        name: 'description',
        content:
          'Professor & Head of Computer Engineering, MMCOE Pune. Research in video retrieval, machine learning and database systems.',
      },
      { property: 'og:title', content: 'Dr. Kalpana Sunil Thakre — Academic Portfolio' },
      {
        property: 'og:description',
        content: 'Three decades of research, teaching and academic leadership.',
      },
    ],
  }),
  component: PortfolioPage,
});
