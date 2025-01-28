import { Button } from '@/components/shared/Button';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 text-center">
      <h1 className="text-2xl">404 - Topilmadi!</h1>
      <p>
        Kechirasiz, siz izlayotgan sahifa topilmadi <br /> yoki endi mavjud emas
      </p>
      <Button
        onClick={() => navigate('/', { replace: true })}
        variant="default"
        className="!mt-10"
      >
        Bosh sahifaga qaytish
      </Button>
    </div>
  );
};

export default NotFound;
