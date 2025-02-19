import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/shared/DataTable';

import { useAdminsQuery } from '@/react-query/queries/admin.queries';
import { useDeleteAdminMutation } from '@/react-query/mutations/admin.mutations';
import { formatDate } from '@/utils/format-date';
import { Button } from '@/components/shared/Button';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import Loader from '@/components/shared/Loader';
import { TbLayoutDashboardFilled } from 'react-icons/tb';

interface AdminTableRow {
  row: {
    original: {
      id: string;
      fullName: string;
      username: string;
      role: string;
      createdAt: string;
      actions: string;
      index: number;
      telegram: string;
      isActive: boolean;
    };
  };
}

const AdminsList = () => {
  const { data: adminsList, isLoading } = useAdminsQuery();
  const navigate = useNavigate();
  const { mutateAsync: deleteAdmin } = useDeleteAdminMutation();

  const adminData =
    adminsList?.admins.map((admin, index) => ({
      id: admin._id,
      index: index + 1,
      fullName: admin.full_name,
      username: admin.username,
      role: admin.role === 'SUPER_ADMIN' ? 'Boshqaruvchi' : 'Admin',
      createdAt: formatDate(admin.createdAt),
      telegram: admin.telegram || '',
      isActive: admin.isActive,
      actions: '',
    })) || [];

  const handleDelete = async (id: string) => {
    if (!confirm('Ushbu adminni o`chirishga ishonchingiz komilmi?')) return;
    await deleteAdmin(id);
  };

  const adminColumns = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }: AdminTableRow) => <span>{row.original.index}</span>,
    },
    {
      accessorKey: 'fullName',
      header: 'Ism',
      cell: ({ row }: AdminTableRow) => <span>{row.original.fullName}</span>,
    },
    {
      accessorKey: 'username',
      header: 'Foydalanuvchi nomi',
      cell: ({ row }: AdminTableRow) => <span>{row.original.username}</span>,
    },
    {
      accessorKey: 'role',
      header: 'Rol',
      cell: ({ row }: AdminTableRow) => (
        <span className={row.original.role === 'Boshqaruvchi' ? 'text-orange-500' : ''}>{row.original.role}</span>
      ),
    },
    {
      accessorKey: 'telegram',
      header: 'Telegram Bot',
      cell: ({ row }: AdminTableRow) => (
        <span className={row.original.telegram ? 'text-emerald-500' : 'text-rose-500'}>
          {row.original.telegram ? 'Mavjud' : 'Mavjud emas'}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Yaratilgan vaqti',
      cell: ({ row }: AdminTableRow) => <span>{row.original.createdAt}</span>,
    },
    {
      accessorKey: 'isActive',
      header: 'Faollik',
      cell: ({ row }: AdminTableRow) => (
        <span className={row.original.isActive ? 'text-emerald-500' : 'text-rose-500'}>
          {row.original.isActive ? 'Faol' : 'Faol emas'}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Amallar',
      cell: ({ row }: AdminTableRow) => (
        <div className="flex space-x-5">
          <Button
            variant="icon"
            size="icon"
            className="text-green"
            onClick={() => navigate(`/dashboard/admins/update/${row.original.id}`)}
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
        <TbLayoutDashboardFilled className="inline w-6 h-6" /> Adminlar ro'yxati
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-[calc(100vh-180px)]">
          <DataTable columns={adminColumns} data={adminData} />
        </div>
      )}
    </div>
  );
};

export default AdminsList;
