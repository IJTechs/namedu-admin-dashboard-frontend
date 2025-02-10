import { Outlet } from 'react-router-dom';
import TabsComponent from '@/components/shared/TabsComponent';

const NewsPage = () => {
  const tabs = [
    {
      label: 'Yangiliklar ro`yxati',
      value: 'all_news',
      path: '/dashboard/news',
    },
    {
      label: 'Yangilik qo`shish',
      value: 'manage_news',
      path: '/dashboard/news/post',
    },
  ];

  return (
    <>
      <TabsComponent defaultValue="all_news" tabs={tabs} tabsListClassName="mb-4 bg-white !rounded-14 py-4 " />
      <Outlet />
    </>
  );
};

export default NewsPage;
