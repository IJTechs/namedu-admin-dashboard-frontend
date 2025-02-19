import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/shared/DataTable';
import { useDeleteNewsMutation } from '@/react-query/mutations/news.mutations';
import { Button } from '@/components/shared/Button';
import { useNewsByIdQuery, useNewsQuery } from '@/react-query/queries/news.queries';
import { formatDate } from '@/utils/format-date';
import Loader from '@/components/shared/Loader';
import { FiTrash2, FiEdit, FiEye } from 'react-icons/fi';
import NewsModal from '@/components/shared/NewsModal';
import { TbLayoutDashboardFilled } from 'react-icons/tb';

interface NewsTableRow {
  row: {
    original: {
      id: string;
      title: string;
      authorName: string;
      createdAt: string;
      actions: string;
      index: number;
    };
  };
}
const AllNews = () => {
  const { data: newsList, isLoading } = useNewsQuery();

  const deleteNews = useDeleteNewsMutation();
  const navigate = useNavigate();
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const { data: selectedNews } = useNewsByIdQuery(selectedNewsId!);

  const truncateText = (text: string, maxLength = 30) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const newsData =
    newsList?.news.map((news, index) => ({
      id: news._id,
      index: index + 1,
      title: news.title,
      authorName: news.authorName,
      createdAt: formatDate(news.createdAt),
      actions: '',
    })) || [];

  const handleDelete = async (id: string) => {
    if (confirm('Ushbu yangilikni o`chirishga ishonchingiz komilmi?')) {
      deleteNews.mutate(id);
    }
  };

  const newsColumns = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }: NewsTableRow) => <span>{row.original.index}</span>,
    },
    {
      accessorKey: 'title',
      header: 'Sarlavha',
      cell: ({ row }: NewsTableRow) => <span>{truncateText(row.original.title, 40)}</span>,
    },
    {
      accessorKey: 'authorName',
      header: 'Muallif',
      cell: ({ row }: NewsTableRow) => <span>{truncateText(row.original.authorName)}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Post vaqti',
      cell: ({ row }: NewsTableRow) => <span>{row.original.createdAt}</span>,
    },
    {
      accessorKey: 'actions',
      header: 'Amallar',
      cell: ({ row }: NewsTableRow) => (
        <div className="flex space-x-5">
          <Button
            variant="icon"
            size="icon"
            className="text-secondary-button"
            onClick={() => setSelectedNewsId(row.original.id)}
          >
            <FiEye />
          </Button>
          <Button
            variant="icon"
            size="icon"
            className="text-green"
            onClick={() => navigate(`/dashboard/news/edit/${row.original.id}`)}
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
      <h1 className="text-xl font-normal text-slate-600  ">
        <TbLayoutDashboardFilled className="inline w-6 h-6 " /> Yangiliklar ro'yxati
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-[calc(100vh-180px)]">
          <DataTable columns={newsColumns} data={newsData} />
          {selectedNews && <NewsModal newsData={selectedNews} onClose={() => setSelectedNewsId(null)} />}
        </div>
      )}
    </div>
  );
};

export default AllNews;
