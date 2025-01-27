import { createRoot } from 'react-dom/client';

import './styles/index.css';
const Main = () => {
  return (
    <>
      <h1>Hello World</h1>
    </>
  );
};

createRoot(document.getElementById('root')!).render(<Main />);
