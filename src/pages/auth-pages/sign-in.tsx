import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/shared/Button';
import { Toastify } from '@/utils/toastify';
import { userFormSchema } from '@/utils/validators/auth.validators';
import { useUserLoginMutation } from '@/react-query/mutations/auth.mutations';
import { IAxiosError } from '@/utils/interfaces/axios-error.interface';
const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const { mutateAsync: userLogin } = useUserLoginMutation();

  const methods = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    formState: { errors, isSubmitting, isValid, isDirty },
  } = methods;

  const onSubmit = async (data: z.infer<typeof userFormSchema>) => {
    try {
      await userLogin(data);
      Toastify({
        variant: 'success',
        message: 'Tizimga muvaffaqiyatli kirdingiz!',
      });
      navigate(from, { replace: true });
    } catch (error) {
      const axiosError = error as IAxiosError;

      if (axiosError?.response?.status === 400) {
        Toastify({
          variant: 'error',
          message: "Foydalanuvchi nomi yoki parol noto'g'ri!",
        });
        return;
      }
      Toastify({
        variant: 'error',
        message: "Xatolik yuz berdi, iltimos qayta urinib ko'ring!",
      });
    }
  };

  return (
    <div className="bg-primaryBackground w-screen h-screen flex items-center justify-center py-5 px-8 xs:px-16 sm:px-20">
      <Form {...methods}>
        <form
          autoComplete="email"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full max-w-[450px] bg-white rounded-14  p-6 xs:p-10 sm:px-12 space-y-6"
        >
          <h1 className="text-xl sm:text-2xl text-primary-heading text-center  ">Tizimga Kirish</h1>

          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input id="email" {...field} placeholder="Foydalanuvchi nomi" hasError={!!errors.username} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="password"
                    {...field}
                    type="password"
                    placeholder="Foydalanuvchi paroli"
                    hasError={!!errors.password}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !isDirty}
            className="w-full h-12 text-white rounded-12"
          >
            Tizimga kirish
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
