import { createRoot } from 'react-dom/client';
import { ReactQueryLayout } from './layouts/react-query-layout.tsx';
import Router from './routes/index.route';
import './styles/index.css';
import { Toaster } from './components/ui/sonner.tsx';

const Main = () => {
  return (
    <ReactQueryLayout>
      <Toaster theme="light" />
      <Router />
    </ReactQueryLayout>
  );
};

createRoot(document.getElementById('root')!).render(<Main />);
