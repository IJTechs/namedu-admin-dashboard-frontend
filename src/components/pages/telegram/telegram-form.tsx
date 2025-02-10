import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/ui/input';
import { useAdminsQuery } from '@/react-query/queries/admin.queries';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { ICreateTelegramRequest, IUpdateTelegramRequest } from '@/utils/interfaces/telegram.interface';
import { Toastify } from '@/utils/toastify';

interface IProps {
  initialData?: IUpdateTelegramRequest;
  // eslint-disable-next-line no-unused-vars
  onSubmitForm: (data: ICreateTelegramRequest) => void;
  isLoading?: boolean;
}

const telegramSchema = z.object({
  botToken: z.string().nonempty('Bot token kiritilishi shart'),
  channelId: z.string().nonempty('Kanal ID kiritilishi shart'),
  adminId: z.preprocess(
    val => (typeof val === 'string' ? Number(val) : val),
    z.number().positive('Admin ID musbat son bo‘lishi kerak')
  ),

  linkedAdmin: z.string().optional(),
});

export const TelegramForm = ({ initialData, onSubmitForm, isLoading = false }: IProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: adminsData } = useAdminsQuery();
  const methods = useForm({
    resolver: zodResolver(telegramSchema),
    defaultValues: initialData || {
      botToken: '',
      channelId: '',
      adminId: 0,
      linkedAdmin: user?.role === 'SUPER_ADMIN' ? '' : user?._id,
    },
  });

  const { handleSubmit, formState, reset } = methods;
  const { isSubmitting, isDirty } = formState;

  const onSubmit: SubmitHandler<ICreateTelegramRequest> = async data => {
    try {
      // ✅ Prevent SUPER_ADMIN from submitting without selecting `linkedAdmin`
      if (user?.role === 'SUPER_ADMIN' && !data.linkedAdmin) {
        Toastify({ variant: 'error', message: 'Bog‘langan adminni tanlang!' });
        return;
      }

      onSubmitForm(data);
    } catch (error) {
      console.error('❌ Form submission failed', error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 min-h-[calc(100vh-200px)]">
      <div>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Bot Token */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">
                    Bot Token <span className="text-rose-500">*</span>
                  </span>
                </div>
                <div>
                  <FormField
                    name="botToken"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="botToken"
                            type="text"
                            className="bg-gray-200"
                            {...field}
                            disabled={isSubmitting}
                            placeholder="Bot Token"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Channel ID */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">
                    Kanal ID <span className="text-rose-500">*</span>
                  </span>
                </div>
                <div>
                  <FormField
                    name="channelId"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="channelId"
                            type="text"
                            className="bg-gray-200"
                            {...field}
                            disabled={isSubmitting}
                            placeholder="Kanal ID"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Admin ID (Who Owns the Bot) */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">
                    Telegram kanal va bot admin ID <span className="text-rose-500">*</span>
                  </span>
                </div>
                <div>
                  <FormField
                    name="adminId"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="adminId"
                            type="number"
                            className="bg-gray-200"
                            {...field}
                            disabled={isSubmitting}
                            placeholder="Admin ID"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Linked Admin (Only for SUPER_ADMIN) */}
              {user?.role === 'SUPER_ADMIN' && (
                <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                  <div className="flex items-center justify-between font-normal">
                    <span className="text-slate-600 italic">Bog‘langan Admin</span>
                  </div>
                  <div>
                    <FormField
                      name="linkedAdmin"
                      control={methods.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <select id="linkedAdmin" {...field} className="bg-gray-200 p-2 rounded-md">
                              <option value="">Tanlang</option>
                              {adminsData?.admins.map(admin => (
                                <option key={admin._id} value={admin._id}>
                                  {admin.full_name} ({admin.username})
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="reset"
                variant="destructive"
                onClick={() => {
                  reset();
                  navigate('/dashboard/telegrams');
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
                className="w-full "
                disabled={isLoading || isSubmitting}
              >
                Formani tozalash
              </Button>
              <Button
                type="submit"
                loading={isLoading || isSubmitting}
                disabled={isSubmitting || !isDirty || isLoading}
                className="w-full bg-emerald-500"
              >
                {initialData ? 'Tahrirlash' : 'Qo‘shish'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
