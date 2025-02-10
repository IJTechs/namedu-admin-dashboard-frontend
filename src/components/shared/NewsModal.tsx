import { formatDate } from '@/utils/format-date';
import { Button } from './Button';
import { useState } from 'react';

interface INewsModal {
  newsData: {
    title: string;
    content: string;
    images: string[] | File[];
    createdAt: string;
    readTime?: number;
  };
  onClose: () => void;
  onConfirm: () => void;
}

const NewsModal = ({ newsData, onClose, onConfirm }: INewsModal) => {
  const [isChecked, setIsChecked] = useState(false);

  const { title, content, images, createdAt } = newsData;

  const truncateUrl = (url: string, maxLength = 40) => {
    return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
  };
  const formatContentWithLinks = (newsContent: string): string => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return newsContent.replace(urlRegex, url => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 ">${truncateUrl(url)}</a>`;
    });
  };
  return (
    <section className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-80 z-50 overflow-y-scroll ">
      <div className=" h-screen  max-w-7xl w-full mx-auto   sm:p-6 md:p-12  rounded-12 bg-primary-background shadow-lg relative overflow-hidden flex flex-col">
        <Button variant="icon" size="icon" className="absolute top-4 right-4" onClick={onClose}>
          X
        </Button>
        <div className="bg-primary-background flex1 w-full overflow-auto scrollbar-hide">
          {images?.[0] && (
            <img
              src={typeof images[0] === 'string' ? images[0] : URL.createObjectURL(images[0])}
              className=" w-full max-h-[720px] object-cover rounded-12 shadow-sm"
              alt="News Image"
            />
          )}
          <div className="relative -top-10 w-full flex flex-col gap-6">
            {/* News Title */}
            <div className="w-full bg-white h-[60px] sm:h-[80px] rounded-12 flex items-center justify-center text-lg sm:text-xl md:text-2xl text-primary-heading font-semibold shadow-sm mt-10">
              <h1 className="text-center px-4">{title}</h1>
            </div>

            {/* Breadcrumb */}
            <div className="mt-3 sm:my-5 flex flex-col sm:flex-row items-start sm:items-center  gap-2">
              <span>Post vaqti:</span>
              <span className="text-xs sm:text-sm font-extralight text-gray-400 flex-shrink-0">
                {createdAt && formatDate(createdAt)}
              </span>
            </div>

            {/* News Content */}
            <div className="text-justify leading-relaxed font-light text-base sm:text-lg md:text-xl h-full  ">
              <p
                dangerouslySetInnerHTML={{
                  __html: formatContentWithLinks(content || ''),
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-12 mt-4 flex items-center justify-between">
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
              <span>Men ushbu yangilikni e'lon qilishga roziman</span>
            </label>
          </div>
          <div className="flex justify-end space-x-4 ">
            <Button className="bg-rose-500" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button onClick={onConfirm} disabled={!isChecked} className="bg-emerald-500">
              Tasdiqlash & E'lon qilish
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsModal;
