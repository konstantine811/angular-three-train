import { IMenuConfig } from '@core/models/menu.model';

export const MENU_CONFIG: IMenuConfig[] = [
  {
    title: 'First title',
    children: [
      {
        title: 'FSub link 1',
        children: [
          {
            title: 'FSub link 3',
          },
          {
            title: 'FSub link 4',
          },
        ],
      },
      {
        title: 'FSub link 2',
        children: [
          {
            title: 'FSub link 3',
          },
          {
            title: 'FSub link 4',
          },
        ],
      },
    ],
  },
  {
    title: 'Second title',
    children: [
      {
        title: 'SSub link 1',
      },
      {
        title: 'SSub link 2',
        children: [
          {
            title: 'FSub link 3',
          },
          {
            title: 'FSub link 4',
          },
        ],
      },
    ],
  },
  {
    title: 'Third title',
  },
];
