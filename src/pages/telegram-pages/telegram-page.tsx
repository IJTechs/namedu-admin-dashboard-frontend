import { Outlet } from 'react-router-dom';
import TabsComponent from '@/components/shared/TabsComponent';
const TelegramPage = () => {
  const tabs = [
    {
      label: 'Telegram botlar ro`yxati',
      value: 'all_telegrams',
      path: '/dashboard/telegrams',
    },
    {
      label: 'Telegram bot qo`shish',
      value: 'add_telegram',
      path: '/dashboard/telegrams/create',
    },
  ];
  return (
    <>
      <TabsComponent defaultValue="all_telegrams" tabs={tabs} tabsListClassName="mb-4 bg-white !rounded-14 py-4  " />
      <Outlet />
    </>
  );
};

export default TelegramPage;
