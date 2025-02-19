import { useParams } from 'react-router-dom';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { useNewsByIdQuery } from '@/react-query/queries/news.queries';
import { useUpdateNewsMutation } from '@/react-query/mutations/news.mutations';
import { NewsForm } from '@/components/pages/news/news-form';
import { INewsRquestData } from '@/utils/interfaces/news.interface';

const NewsEditPage = () => {
  const { news_id } = useParams();

  const { data: newsData, isLoading: isFetching } = useNewsByIdQuery(news_id as string);

  const { mutateAsync: updateNews, isPending } = useUpdateNewsMutation();

  if (!newsData) return null;
  const dataToUpdate: INewsRquestData = {
    title: newsData.title,
    content: newsData.content,
    readTime: newsData.readTime,
    images: newsData.images,
  };

  const handleMutation = async (formData: FormData) => {
    await updateNews({ newsId: news_id as string, newsData: formData });
  };

  if (isFetching) return <p className="text-center text-gray-500">Yuklanmoqda...</p>;

  return (
    <div className="bg-white rounded-14 p-5 space-y-5">
      <h1 className="text-xl font-normal text-slate-600">
        <TbLayoutDashboardFilled className="inline w-6 h-6" /> Yangilikni Tahrirlash
      </h1>
      <NewsForm initialData={dataToUpdate} onSubmitForm={handleMutation} isLoading={isPending} />
    </div>
  );
};

export default NewsEditPage;
