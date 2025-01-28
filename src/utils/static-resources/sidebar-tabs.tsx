import { ROUTE_PATHS } from '@/utils/constants/route.paths';
import { HiOutlineNewspaper, HiUserPlus } from 'react-icons/hi2';
import { BsRobot } from 'react-icons/bs';
import { VscSettings } from 'react-icons/vsc';

export const SIDEBAR_TABS = [
  {
    title: 'Yangiliklar',
    icon: HiOutlineNewspaper,
    link: ROUTE_PATHS.NEWS_LIST,
  },
  {
    title: 'Adminlar',
    icon: HiUserPlus,
    link: ROUTE_PATHS.ADMINS_LIST,
  },
  {
    title: 'Telegram',
    icon: BsRobot,
    link: ROUTE_PATHS.TELEGRAM_LIST,
  },
  {
    title: 'Sozlamalar',
    icon: VscSettings,
    link: ROUTE_PATHS.ACCOUNT_SETTINGS,
  },
];
