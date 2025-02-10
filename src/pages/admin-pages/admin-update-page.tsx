import { useParams, useNavigate } from 'react-router-dom';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { useAdminByIdQuery } from '@/react-query/queries/admin.queries';
import { useUpdateAdminMutation } from '@/react-query/mutations/admin.mutations';
import { AdminForm } from '@/components/pages/admin/admin-form';
import { IUpdateAdminRequest } from '@/utils/interfaces/admin.interface';

const AdminUpdatePage = () => {
  const { admin_id } = useParams();
  const navigate = useNavigate();

  const { data: adminData, isLoading: isFetching } = useAdminByIdQuery(admin_id as string);
  const { mutateAsync: updateAdmin, isPending } = useUpdateAdminMutation();

  if (!adminData) return null;

  const dataToUpdate: IUpdateAdminRequest = {
    full_name: adminData.admin.full_name,
    username: adminData.admin.username,
    password: '',
    confirm_password: '',
    role: adminData.admin.role,
    isActive: adminData.admin.isActive,
  };

  const handleMutation = async (formData: IUpdateAdminRequest) => {
    await updateAdmin({ adminId: admin_id as string, data: formData });
    navigate('/dashboard/admins', { replace: true });
  };

  if (isFetching) return <p className="text-center text-gray-500">Yuklanmoqda...</p>;

  return (
    <div className="bg-white rounded-14 p-5 space-y-5">
      <h1 className="text-xl font-normal text-slate-600">
        <TbLayoutDashboardFilled className="inline w-6 h-6" /> Adminni Tahrirlash
      </h1>
      <AdminForm initialData={dataToUpdate} onSubmitForm={handleMutation} isLoading={isPending} />
    </div>
  );
};

export default AdminUpdatePage;
