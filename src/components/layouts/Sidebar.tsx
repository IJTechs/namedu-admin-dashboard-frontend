import { NavLink, useNavigate } from 'react-router-dom';
import { SIDEBAR_TABS } from '@/utils/static-resources/sidebar-tabs';
import { Button } from '../shared/Button';
import { HiOutlineLogout } from 'react-icons/hi';
import { useUserLogoutMutation } from '@/react-query/mutations/auth.mutations';
const Sidebar = () => {
  const navigate = useNavigate();
  const { mutateAsync: userLogout } = useUserLogoutMutation();
  const handleLogout = async () => {
    await userLogout();
    navigate('/auth/login', { replace: true });
  };
  return (
    <aside className="stiky top-0 bg-white w-60 h-[calc(100vh-140px)] px-3 py-10 relative  flex flex-col justify-between rounded-14 shadow-sm ">
      <ul className=" flex flex-col gap-3">
        {SIDEBAR_TABS.map((tab, index) => (
          <li key={index} className="">
            <NavLink
              to={tab.link}
              end
              className={({ isActive }) =>
                `flex items-center font-light gap-3 p-4  rounded-lg bg-sky-100 text-primary-accent  ${isActive ? ' bg-sky-200' : 'hover:bg-sky-200 text-opacity-70'} `
              }
            >
              <tab.icon className="w-6 h-6" />
              {tab.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => handleLogout()}
        variant="icon"
        size={'icon'}
        className="text-rose-500"
      >
        Chiqish <HiOutlineLogout />
      </Button>
    </aside>
  );
};

export default Sidebar;
