import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/shared/Button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { ICreateAdminRequest, IUpdateAdminRequest } from '@/utils/interfaces/admin.interface';

interface IProps {
  initialData?: IUpdateAdminRequest;
  onSubmitForm: (data: ICreateAdminRequest) => void;
  isLoading?: boolean;
}

const adminCreateSchema = z
  .object({
    full_name: z.string().min(3, 'Ism kamida 3 ta belgidan iborat bo‘lishi kerak').nonempty('Ism kiritilishi shart'),
    username: z
      .string()
      .min(3, 'Foydalanuvchi nomi kamida 3 ta belgidan iborat bo‘lishi kerak')
      .nonempty('Foydalanuvchi nomi kiritilishi shart'),
    password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak').nonempty('Parol kiritilishi shart'),
    confirm_password: z.string().nonempty('Parolni tasdiqlash shart'),
    role: z.enum(['ADMIN', 'SUPER_ADMIN'], {
      required_error: 'Rol tanlanishi shart',
    }),
    isActive: z.boolean().default(true),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Parollar mos kelmadi',
    path: ['confirm_password'],
  });

const adminUpdateSchema = z
  .object({
    full_name: z.string().min(3, 'Ism kamida 3 ta belgidan iborat bo‘lishi kerak').nonempty('Ism kiritilishi shart'),
    username: z
      .string()
      .min(3, 'Foydalanuvchi nomi kamida 3 ta belgidan iborat bo‘lishi kerak')
      .nonempty('Foydalanuvchi nomi kiritilishi shart'),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
    role: z.enum(['ADMIN', 'SUPER_ADMIN']).optional().default('ADMIN'),
    isActive: z.boolean().default(true),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Parollar mos kelmadi',
    path: ['confirm_password'],
  });

export const AdminForm = ({ initialData, onSubmitForm, isLoading = false }: IProps) => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(initialData ? adminUpdateSchema : adminCreateSchema),
    defaultValues: initialData || {
      full_name: '',
      username: '',
      password: '',
      confirm_password: '',
      role: 'ADMIN',
      isActive: true,
    },
  });

  const { handleSubmit, formState, reset } = methods;
  const { isSubmitting, isDirty } = formState;

  // Handle form submission
  const onSubmit: SubmitHandler<ICreateAdminRequest> = async data => {
    try {
      console.log('🔹 Submitting Admin Data:', data);
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
              {/* Full Name */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">
                    To‘liq ism <span className="text-rose-500">*</span>
                  </span>
                </div>
                <div>
                  <FormField
                    name="full_name"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="full_name"
                            type="text"
                            className="bg-gray-200"
                            {...field}
                            disabled={isSubmitting}
                            placeholder="To‘liq ism"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Username */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">
                    Foydalanuvchi nomi <span className="text-rose-500">*</span>
                  </span>
                </div>
                <div>
                  <FormField
                    name="username"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="username"
                            type="text"
                            className="bg-gray-200"
                            {...field}
                            disabled={isSubmitting}
                            placeholder="Foydalanuvchi nomi"
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
              {/* Password */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">
                    Parol <span className="text-rose-500">*</span>
                  </span>
                </div>
                <div>
                  <FormField
                    name="password"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            className="bg-gray-200"
                            {...field}
                            disabled={isSubmitting}
                            placeholder="Parol"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">
                    Parolni tasdiqlash <span className="text-rose-500">*</span>
                  </span>
                </div>
                <div>
                  <FormField
                    name="confirm_password"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="confirm_password"
                            type="password"
                            className="bg-gray-200"
                            {...field}
                            disabled={isSubmitting}
                            placeholder="Parolni tasdiqlash"
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
              {/* Role Selection */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">Rol tanlash</span>
                </div>
                <div>
                  <FormField
                    name="role"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <select id="role" {...field} className="bg-gray-200 p-2 rounded-md">
                            <option value="ADMIN">Admin</option>
                            <option value="SUPER_ADMIN">Super Admin</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Status Toggle */}
              <div className="border-[0.2px] border-gray-200 bg-[#F1F1F1]/80 p-4 rounded-10 space-y-4 flex-1">
                <div className="flex items-center justify-between font-normal">
                  <span className="text-slate-600 italic">Admin Faolmi?</span>
                </div>
                <div>
                  <FormField
                    name="isActive"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="reset"
                variant="destructive"
                onClick={() => {
                  reset();
                  navigate('/dashboard/admins');
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
                className="w-full"
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
                {initialData ? 'Tahrirlash' : 'Yaratish'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
