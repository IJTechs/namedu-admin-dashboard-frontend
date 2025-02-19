import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useCreateTelegramMutation } from '@/react-query/mutations/telegram.mutations';
import { Toastify } from '@/utils/toastify';
import { TelegramForm } from '@/components/pages/telegram/telegram-form';

import { ICreateTelegramRequest } from '@/utils/interfaces/telegram.interface';

const AddTelegramPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: createTelegram, isPending } = useCreateTelegramMutation();

  const handleMutation = async (data: ICreateTelegramRequest) => {
    await createTelegram(data, {
      onSuccess: () => {
        navigate('/dashboard/telegrams', { replace: true });
        Toastify({
          variant: 'success',
          message: 'Telegram bot muvaffaqiyatli qo‘shildi',
        });
      },
    });
  };

  return (
    <div className="bg-white rounded-14 p-5 space-y-5">
      <h1 className="text-xl font-normal text-slate-600">
        <TbLayoutDashboardFilled className="inline w-6 h-6" /> Telegram Bot Qo`shish
      </h1>
      <TelegramForm onSubmitForm={handleMutation} isLoading={isPending} />
    </div>
  );
};

export default AddTelegramPage;
