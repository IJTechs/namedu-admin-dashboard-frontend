import { ROUTE_PATHS } from '@/utils/constants/route.paths';
import { HiOutlineNewspaper, HiUserPlus } from 'react-icons/hi2';
import { BsRobot } from 'react-icons/bs';

export const SIDEBAR_TABS = [
  {
    title: 'Yangiliklar',
    icon: HiOutlineNewspaper,
    link: ROUTE_PATHS.GET_NEWS,
  },
  {
    title: 'Adminlar',
    icon: HiUserPlus,
    link: ROUTE_PATHS.GET_ADMINS,
  },
  {
    title: 'Telegram',
    icon: BsRobot,
    link: ROUTE_PATHS.GET_TELEGRAM,
  },
];
