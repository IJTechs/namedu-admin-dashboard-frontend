import React from 'react';

import Loader from './Loader';

interface SuspenseProps {
  children: React.ReactNode;
}

export const Suspense = ({ children }: SuspenseProps) => {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};
