import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { useTelegramByIdQuery } from '@/react-query/queries/telegram.queries';
import { useUpdateTelegramMutation } from '@/react-query/mutations/telegram.mutations';
import { Toastify } from '@/utils/toastify';
import { TelegramForm } from '@/components/pages/telegram/telegram-form';
import { IUpdateTelegramRequest } from '@/utils/interfaces/telegram.interface';

const UpdateTelegramPage = () => {
  const { telegram_id } = useParams();
  const navigate = useNavigate();

  const { data: telegramData, isLoading: isFetching } = useTelegramByIdQuery(telegram_id as string);

  const { mutateAsync: updateTelegram, isPending } = useUpdateTelegramMutation();

  if (!telegramData) return null;

  const dataToUpdate: IUpdateTelegramRequest = {
    botToken: telegramData.telegram_bot.botToken,
    channelId: telegramData.telegram_bot.channelId,
    adminId: telegramData.telegram_bot.adminId,
    linkedAdmin: telegramData.telegram_bot.linkedAdmin?._id || '',
  };
  const handleMutation = async (data: IUpdateTelegramRequest) => {
    await updateTelegram({ telegramId: telegram_id as string, data });
    Toastify({ variant: 'success', message: 'Telegram bot ma’lumotlari yangilandi' });
    navigate('/dashboard/telegrams', { replace: true });
  };

  if (isFetching) return <p className="text-center text-gray-500">Yuklanmoqda...</p>;

  return (
    <div className="bg-white rounded-14 p-5 space-y-5">
      <h1 className="text-xl font-normal text-slate-600">
        <TbLayoutDashboardFilled className="inline w-6 h-6" /> Telegram Botni Tahrirlash
      </h1>
      <TelegramForm initialData={dataToUpdate} onSubmitForm={handleMutation} isLoading={isPending} />
    </div>
  );
};

export default UpdateTelegramPage;
