import { Outlet } from 'react-router-dom';
import TabsComponent from '@/components/shared/TabsComponent';
const AdminsPage = () => {
  const tabs = [
    {
      label: 'Adminlar ro`yxati',
      value: 'all_admins',
      path: '/dashboard/admins',
    },
    {
      label: 'Admin qo`shish',
      value: 'add_admin',
      path: '/dashboard/admins/create',
    },
  ];
  return (
    <>
      <TabsComponent defaultValue="all_admins" tabs={tabs} tabsListClassName="mb-4 bg-white !rounded-14 py-4 " />
      <Outlet />
    </>
  );
};

export default AdminsPage;
