import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animOpenMenu = trigger('openMenu', [
  transition(':enter', [
    query(
      ':enter',
      [
        style({ height: '', opacity: 0, transform: 'translateX(-3px)' }),
        animate(
          '550ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ height: '*', opacity: 1, transform: 'none' })
        ),
      ],
      { optional: true }
    ),
  ]),
  transition(':leave', [
    animate('150ms ease-out', style({ height: '0', opacity: 0 })),
  ]),
]);
