import React from 'react';

import Loader from './Loader';

interface SuspenseProps {
  children: React.ReactNode;
}

const Suspense = ({ children }: SuspenseProps) => {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};

export default Suspense;
