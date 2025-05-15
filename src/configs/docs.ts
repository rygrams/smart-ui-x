import { MainNavItem, SidebarNavItem } from '~/types/nav'

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  chartsNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/installation',
          items: [],
        },
        {
          title: 'Changelog',
          href: '/docs/changelog',
          items: [],
        },
      ],
    },
    {
      title: 'Primitives',
      items: [
        {
          title: 'Combobox',
          href: '/docs/components/combobox-primitive',
          items: [],
        },
        {
          title: 'Date Time Field',
          href: '/docs/components/date-time-field-primitive',
          items: [],
        },
        {
          title: 'Date Time Range Field',
          href: '/docs/components/date-time-range-field-primitive',
          items: [],
        },
        {
          title: 'Date Picker',
          href: '/docs/components/date-picker-primitive',
          items: [],
        },
        {
          title: 'Dropzone',
          href: '/docs/components/dropzone-primitive',
          items: [],
        },
        {
          title: 'Password Input',
          href: '/docs/components/password-input-primitive',
          items: [],
        },
      ],
    },
    {
      title: 'Utilities',
      items: [
        {
          title: 'Sortable',
          href: '/docs/components/sortable',
          items: [],
        },
        {
          title: 'Virtualizer',
          href: '/docs/components/virtualizer',
          items: [],
          label: 'New',
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Badge Group',
          href: '/docs/components/badge-group',
          items: [],
        },
        {
          title: 'Calendar',
          href: '/docs/components/calendar',
          items: [],
        },
        {
          title: 'Combobox',
          href: '/docs/components/combobox',
          items: [],
        },
        {
          title: 'Confirmer',
          href: '/docs/components/confirmer',
          items: [],
        },
        {
          title: 'Control Group',
          href: '/docs/components/control-group',
          items: [],
          label: 'New',
        },
        {
          title: 'Date Field',
          href: '/docs/components/date-field',
          items: [],
        },
        {
          title: 'Date Time Field',
          href: '/docs/components/date-time-field',
          items: [],
        },
        {
          title: 'Date Time Range Field',
          href: '/docs/components/date-time-range-field',
          items: [],
        },
        {
          title: 'Date Picker',
          href: '/docs/components/date-picker',
          items: [],
        },
        {
          title: 'Description List',
          href: '/docs/components/description-list',
          items: [],
        },
        {
          title: 'Dropzone',
          href: '/docs/components/dropzone',
          items: [],
        },
        {
          title: 'File List',
          href: '/docs/components/file-list',
          items: [],
        },
        {
          title: 'Input Base',
          href: '/docs/components/input-base',
          items: [],
        },
        {
          title: 'Kbd',
          href: '/docs/components/kbd',
          items: [],
        },
        {
          title: 'Native Select',
          href: '/docs/components/native-select',
          items: [],
        },
        {
          title: 'Password Input',
          href: '/docs/components/password-input',
          items: [],
        },
        {
          title: 'Time Field',
          href: '/docs/components/time-field',
          items: [],
        },
        {
          title: 'Time',
          href: '/docs/components/time',
          items: [],
        },
        {
          title: 'Timeline',
          href: '/docs/components/timeline',
          items: [],
        },
      ],
    },
  ],
  chartsNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/charts',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/charts/installation',
          items: [],
        },
        {
          title: 'Theming',
          href: '/docs/charts/theming',
          items: [],
        },
      ],
    },
    {
      title: 'Charts',
      items: [
        {
          title: 'Area Chart',
          href: '/docs/charts/area',
          items: [],
        },
        {
          title: 'Bar Chart',
          href: '/docs/charts/bar',
          items: [],
        },
        {
          title: 'Line Chart',
          href: '/docs/charts/line',
          items: [],
        },
        {
          title: 'Pie Chart',
          href: '/docs/charts/pie',
          items: [],
        },
        {
          title: 'Radar Chart',
          href: '/docs/charts/radar',
          items: [],
        },
        {
          title: 'Radial Chart',
          href: '/docs/charts/radial',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Tooltip',
          href: '/docs/charts/tooltip',
          items: [],
        },
        {
          title: 'Legend',
          href: '/docs/charts/legend',
          items: [],
        },
      ],
    },
  ],
}
