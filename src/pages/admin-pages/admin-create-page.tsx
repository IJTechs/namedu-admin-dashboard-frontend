import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useCreateAdminMutation } from '@/react-query/mutations/admin.mutations';
import { Toastify } from '@/utils/toastify';
import { AdminForm } from '@/components/pages/admin/admin-form';
import { ICreateAdminRequest } from '@/utils/interfaces/admin.interface';

const AdminCreatePage = () => {
  const navigate = useNavigate();
  const { mutateAsync: createAdmin, isPending } = useCreateAdminMutation();

  const handleMutation = async (data: ICreateAdminRequest) => {
    try {
      await createAdmin(data, {
        onSuccess: () => {
          navigate('/dashboard/admins', { replace: true });
          Toastify({
            variant: 'success',
            message: 'Admin muvaffaqiyatli yaratildi',
          });
        },
      });
    } catch (error) {
      console.error('❌ Admin creation failed:', error);
      Toastify({
        variant: 'error',
        message: 'Admin yaratishda xatolik yuz berdi',
      });
    }
  };

  return (
    <div className="bg-white rounded-14 p-5 space-y-5">
      <h1 className="text-xl font-normal text-slate-600">
        <TbLayoutDashboardFilled className="inline w-6 h-6" /> Yangi Admin Yaratish
      </h1>
      <AdminForm onSubmitForm={handleMutation} isLoading={isPending} />
    </div>
  );
};

export default AdminCreatePage;
