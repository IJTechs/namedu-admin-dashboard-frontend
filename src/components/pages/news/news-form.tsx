import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { INewsRquestData } from '@/utils/interfaces/news.interface';
import { NewsImages } from './news-images-form';
import { useNavigate } from 'react-router-dom';
import NewsModal from '@/components/shared/NewsModal';

interface IProps {
  initialData?: INewsRquestData;
  // eslint-disable-next-line no-unused-vars
  onSubmitForm: (data: FormData) => void;
  isLoading?: boolean;
}

const newsSchema = z.object({
  title: z
    .string()
    .min(5, 'Sarlavha kamida 5 ta belgidan iborat bo`lishi kerak')
    .nonempty('Yangilik sarlavhasi kiritilishi shart'),
  content: z
    .string()
    .min(10, 'Matn kamida 10 ta belgidan iborat bo`lishi kerak')
    .nonempty('Yangilik matni kiritilishi shart'),
  images: z.array(z.union([z.string(), z.instanceof(File)])).min(1, 'Yangilik rasmini yuklash shart'),
  readTime: z.preprocess(
    val => (typeof val === 'string' ? Number(val) : val),
    z.number().positive('O‘qish vaqti musbat son bo‘lishi kerak').optional()
  ),
});

export const NewsForm = ({ initialData, onSubmitForm, isLoading = false }: IProps) => {
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const methods = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
      images: [],
      readTime: 0,
    },
  });

  const { handleSubmit, formState, reset, watch } = methods;
  const { isSubmitting, isDirty } = formState;
  const newsData = watch();

  const onSubmit: SubmitHandler<INewsRquestData> = async (data: z.infer<typeof newsSchema>) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('readTime', data.readTime ? data.readTime.toString() : '0');

      const existingImages = data.images.filter(img => typeof img === 'string');
      const newImages = data.images.filter(img => img instanceof File) as File[];

      existingImages.forEach((url, index) => {
        formData.append(`existing_images[${index}]`, url);
      });

      newImages.forEach(file => {
        formData.append('images', file);
      });

      onSubmitForm(formData);
    } catch (error) {
      throw new Error('Form submission failed');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Form {...methods}>
          <form action="" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <div className="flex gap-4">
              {/* Title */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">
                    Yangilik sarlavhasi <span className="text-rose-500">*</span>
                  </span>
                </div>
                <div>
                  <FormField
                    name="title"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="title"
                            type="text"
                            className="bg-gray-200"
                            {...field}
                            disabled={isSubmitting}
                            placeholder="Yangilik sarlavhasi"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Read Time */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">O'qish vaqti</span>
                </div>
                <div>
                  <FormField
                    name="readTime"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="readTime"
                            type="number"
                            className="bg-gray-200"
                            {...field}
                            disabled={isSubmitting}
                            placeholder="O'qish vaqti"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
              <div className="flex items-center justify-between font-normal">
                <span className="text-slate-600 italic">
                  Yangilik matni <span className="text-rose-500">*</span>
                </span>
              </div>
              <div>
                <FormField
                  name="content"
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          id="content"
                          className="bg-gray-200 !h-full"
                          {...field}
                          disabled={isSubmitting}
                          rows={12}
                          placeholder="Yangilik matni"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Images */}
            <NewsImages control={methods.control} name="images" validationError={formState.errors.images?.message} />

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="reset"
                variant="destructive"
                onClick={() => {
                  reset();
                  navigate('/dashboard/news');
                }}
                className="w-full"
                disabled={isLoading || isSubmitting}
              >
                Bekor qilish
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  reset();
                }}
                className="w-full bg-orange-500"
                disabled={isLoading || isSubmitting}
              >
                Formani tozalash
              </Button>

              <Button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="w-full bg-blue-500"
                disabled={!isDirty}
              >
                Yangilikni Ko‘rish
              </Button>

              <Button
                type="submit"
                loading={isLoading || isSubmitting}
                className="w-full bg-emerald-500"
                disabled={isLoading || isSubmitting || !isConfirmed}
              >
                {initialData ? 'Tahrirlash' : "E'lon qilish"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {isPreviewOpen && (
        <NewsModal
          newsData={{
            title: newsData.title,
            content: newsData.content,
            images: newsData.images as string[],
            createdAt: initialData?.createdAt || new Date().toISOString(),
          }}
          onClose={() => setIsPreviewOpen(false)}
          onConfirm={() => {
            setIsConfirmed(true);
            setIsPreviewOpen(false);
          }}
        />
      )}
    </div>
  );
};
