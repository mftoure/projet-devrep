// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  home: getIcon('ic_home'),
  time: getIcon('ic_time'),
  calendar: getIcon('ic_calendar'),

};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Acceuil', path: '/pro/dashboard', icon: ICONS.home },
      { title: 'Mes disponibilités', path: '/pro/dashboard/disponibilites', icon: ICONS.calendar },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   items: [
  //     {
  //       title: 'user',
  //       path: '/dashboard/user',
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: '/dashboard/user/four' },
  //         { title: 'Five', path: '/dashboard/user/five' },
  //         { title: 'Six', path: '/dashboard/user/six' },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
