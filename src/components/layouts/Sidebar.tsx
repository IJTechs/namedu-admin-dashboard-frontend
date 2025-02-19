import { NavLink } from 'react-router-dom';
import { SIDEBAR_TABS } from '@/utils/static-resources/sidebar-tabs';
import { Button } from '../shared/Button';
import { HiOutlineLogout } from 'react-icons/hi';
import { useUserLogoutMutation } from '@/react-query/mutations/auth.mutations';
import { useFetchUserMe } from '@/react-query/queries/auth.queries';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { Toastify } from '@/utils/toastify';

const Sidebar = () => {
  const { logout } = useUserLogoutMutation();
  const { data: adminData, isLoading } = useFetchUserMe();

  if (isLoading) return null;

  const handleLogout = async () => {
    await logout();
    Toastify({
      variant: 'success',
      message: 'Tizimdan muvaffaqiyatli chiqdingiz!',
    });
  };
  return (
    <aside className="stiky top-0 left-0 bg-white w-64 h-screen p-3 py-3 pb-10 flex flex-col justify-between  rounded-14 shadow-sm overflow-y-scroll scrollbar-hide  ">
      <div className="flex flex-col gap-5">
        {/* Logo */}
        <img src="/assets/images/logo-full.svg" className="p-1" alt="Logo" loading="lazy" />

        {/* Admin Info */}
        <div className="flex items-center gap-1 text-gray-600 ">
          <div>
            <HiOutlineUserCircle className="w-12 h-12 " />
          </div>
          <div className=" w-full flex flex-col overflow-hidden ">
            <h1 className=" text-lg leading-none truncate" title={adminData?.full_name}>
              {adminData?.full_name}
            </h1>
            <p className="text-sm text-gray-500">{adminData?.role === 'SUPER_ADMIN' ? 'Boshqaruvchi' : 'Admin'}</p>
          </div>
        </div>

        {/* Tabs */}
        <ul className=" flex flex-col gap-3 ">
          {SIDEBAR_TABS.map((tab, index) => (
            <li key={index} className="">
              <NavLink
                to={tab.link}
                end
                className={({ isActive }) =>
                  `flex items-center font-light gap-3 p-4  rounded-lg bg-slate-200 text-gray-600  hover:bg-slate-300  ${isActive && ' !bg-sky-200  '} `
                }
              >
                <tab.icon className="w-6 h-6" />
                {tab.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <Button onClick={() => handleLogout()} variant="icon" size={'icon'} className="text-rose-500">
        Tizimda chiqish <HiOutlineLogout />
      </Button>
    </aside>
  );
};

export default Sidebar;
