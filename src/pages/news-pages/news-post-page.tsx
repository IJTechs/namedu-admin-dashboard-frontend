import { NewsForm } from '@/components/pages/news/news-form';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useCreateNewsMutation } from '@/react-query/mutations/news.mutations';
import { Toastify } from '@/utils/toastify';

const NewsPostPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: createNews, isPending } = useCreateNewsMutation();

  const handleMutation = async (data: FormData) => {
    await createNews(data, {
      onSuccess: () => {
        navigate('/dashboard/news', { replace: true });
        Toastify({
          variant: 'success',
          message: "Yangilik muvaffaqiyatli e'lon qilindi",
        });
      },
    });
  };

  return (
    <div className="bg-white    rounded-14 p-5 space-y-5">
      <h1 className="text-xl font-normal text-slate-600">
        <TbLayoutDashboardFilled className="inline w-6 h-6 " /> Yangilik qo`shish
      </h1>
      <NewsForm onSubmitForm={handleMutation} isLoading={isPending} />
    </div>
  );
};

export default NewsPostPage;
