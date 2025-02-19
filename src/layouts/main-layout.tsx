import Content from '@/components/layouts/Content';
import Sidebar from '@/components/layouts/Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="flex gap-4  h-screen max-w-[1920px] mx-auto  p-5  relative  ">
      <Sidebar />
      <div className="flex-1 ">
        <Content />
      </div>
    </div>
  );
};
