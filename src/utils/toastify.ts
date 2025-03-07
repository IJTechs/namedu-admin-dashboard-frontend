import { toast } from 'sonner';

interface IToastify {
  variant: 'success' | 'error' | 'warn' | 'info';
  message: string;
}

export const Toastify = ({ variant, message }: IToastify) => {
  switch (variant) {
    case 'success':
      toast.success(` ${message}`);
      break;
    case 'error':
      toast.error(`${message}`);
      break;
    case 'warn':
      toast.warning(`${message}`);
      break;
    case 'info':
      toast(`${message}`);
      break;
    default:
      toast(` ${message}`);
      break;
  }
};
