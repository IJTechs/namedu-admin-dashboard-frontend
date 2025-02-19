import { useTheme } from 'next-themes';
import React from 'react';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      position={props.position || 'top-right'}
      richColors
      theme={theme === 'dark' ? 'dark' : 'light'}
      className="toaster group"
      duration={props.duration || 5000}
      toastOptions={{
        className: 'font-montserrat  ',
        style: {
          padding: '16px',
        },
      }}
      closeButton
      {...props}
    />
  );
};

export { Toaster };
