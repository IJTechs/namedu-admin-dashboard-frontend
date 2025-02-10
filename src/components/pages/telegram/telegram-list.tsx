import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/shared/DataTable';
import { useTelegramsQuery } from '@/react-query/queries/telegram.queries';
import { useDeleteTelegramMutation } from '@/react-query/mutations/telegram.mutations';
import { formatDate } from '@/utils/format-date';
import { Button } from '@/components/shared/Button';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import Loader from '@/components/shared/Loader';
import { TbLayoutDashboardFilled } from 'react-icons/tb';

interface TelegramTableRow {
  row: {
    original: {
      id: string;
      botToken: string;
      channelId: string;
      linkedAdmin: string;
      createdAt: string;
      actions: string;
      index: number;
      adminId: number;
    };
  };
}

const TelegramsList = () => {
  const { data: telegramsList, isLoading } = useTelegramsQuery();
  const navigate = useNavigate();
  const { mutateAsync: deleteTelegram } = useDeleteTelegramMutation();

  const truncateText = (text: string, maxLength = 30) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const telegramData =
    telegramsList?.telegram_bots.map((telegram, index) => ({
      id: telegram._id,
      index: index + 1,
      botToken: telegram.botToken,
      channelId: telegram.channelId,
      linkedAdmin: telegram.linkedAdmin?.full_name || 'Topilmadi',
      createdAt: formatDate(telegram.createdAt),
      adminId: telegram.adminId,
      actions: '',
    })) || [];

  const handleDelete = async (id: string) => {
    if (!confirm('Ushbu Telegram botni o`chirishga ishonchingiz komilmi?')) return;
    await deleteTelegram(id);
  };

  const telegramColumns = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }: TelegramTableRow) => <span>{row.original.index}</span>,
    },
    {
      accessorKey: 'botToken',
      header: 'Bot Token',
      cell: ({ row }: TelegramTableRow) => <span className="truncate">{truncateText(row.original.botToken, 20)}</span>,
    },
    {
      accessorKey: 'channelId',
      header: 'Kanal ID',
      cell: ({ row }: TelegramTableRow) => <span>{row.original.channelId}</span>,
    },
    {
      accessorKey: 'adminId',
      header: 'Telegram foydalanuvchi IDsi',
      cell: ({ row }: TelegramTableRow) => <span>{row.original.adminId}</span>,
    },
    {
      accessorKey: 'linkedAdmin',
      header: 'Bog‘langan Admin',
      cell: ({ row }: TelegramTableRow) => <span>{truncateText(row.original.linkedAdmin, 20)}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Yaratilgan vaqti',
      cell: ({ row }: TelegramTableRow) => <span>{row.original.createdAt}</span>,
    },
    {
      accessorKey: 'actions',
      header: 'Amallar',
      cell: ({ row }: TelegramTableRow) => (
        <div className="flex space-x-5">
          <Button
            variant="icon"
            size="icon"
            className="text-green"
            onClick={() => navigate(`/dashboard/telegrams/update/${row.original.id}`)}
          >
            <FiEdit />
          </Button>
          <Button variant="icon" size="icon" className="text-red" onClick={() => handleDelete(row.original.id)}>
            <FiTrash2 />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-14 space-y-5">
      <h1 className="text-xl font-normal text-slate-600">
        <TbLayoutDashboardFilled className="inline w-6 h-6" /> Telegram Botlar Ro'yxati
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-[calc(100vh-180px)]">
          <DataTable columns={telegramColumns} data={telegramData} />
        </div>
      )}
    </div>
  );
};

export default TelegramsList;
