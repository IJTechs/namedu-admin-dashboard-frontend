import { useAuth } from '@/hooks/use-auth';
import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
