import { Outlet } from 'react-router-dom';
const Content = () => {
  return (
    <main className="flex-1 rounded-14">
      <Outlet />
    </main>
  );
};

export default Content;
