import Content from '@/components/layouts/Content';
import Header from '@/components/layouts/Header';
import Sidebar from '@/components/layouts/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex flex-col  min-h-screen max-w-[1920px] mx-auto px-10 py-5  gap-3 ">
      <Header />
      <div className="flex  gap-3 w-full relative ">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default MainLayout;
