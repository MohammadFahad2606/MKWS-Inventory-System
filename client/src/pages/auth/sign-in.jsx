import {
  Input,
  Button,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import API from '../../api/api'; // 👈 axios instance

export function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await API.post('/users/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Logged in successfully!');
      navigate('/dashboard/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="m-8 flex gap-4">
      {/* Left form */}
      <div className="mt-24 w-full lg:w-3/5">
        <div className="text-center">
          <Typography
            variant="h2"
            className="mb-4 font-bold text-[var(--color-foreground)]"
          >
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            className="text-lg font-normal text-[var(--color-mutedForeground)]"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>

        <form
          className="mx-auto mb-2 mt-8 w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-1 flex flex-col gap-6">
            {/* Email */}
            <div>
              {/* <Typography
                variant="small"
                className="-mb-3 font-medium text-[var(--color-foreground)]"
              >
                Your email
              </Typography> */}
              <Input
               label="Your email"
                size="lg"
                placeholder="name@mail.com"
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter valid email',
                  },
                })}
                className="text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
              />
              {errors.email && (
                <Typography
                  variant="small"
                  className="mt-1 font-medium text-[var(--color-destructive)]"
                >
                  {errors.email.message}
                </Typography>
              )}
            </div>

            {/* Password */}
            <div>
              {/* <Typography
                variant="small"
                className="-mb-1 font-medium text-[var(--color-foreground)]"
              >
                Password
              </Typography> */}
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  size="lg"
                  placeholder="********"
                  {...register('password', {
                    required: 'Please enter your password',
                    validate: (value) =>
                      value.trim() !== '' || 'Please enter your password',
                  })}
                  className="pr-10 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
                />
                <IconButton
                  variant="text"
                  size="sm"
                  className="!absolute right-2 top-2 text-[var(--color-foreground)]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </IconButton>
              </div>
              {errors.password && (
                <Typography
                  variant="small"
                  className="mt-1 font-medium text-[var(--color-destructive)]"
                >
                  {errors.password.message}
                </Typography>
              )}
            </div>
          </div>

          {/* Submit button */}
          <Button
            className="mt-6 bg-[var(--color-primary)] text-[var(--color-primaryForeground)] hover:bg-[var(--color-primary)]/90"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          <Typography
            variant="paragraph"
            className="mt-4 text-center font-medium text-[var(--color-mutedForeground)]"
          >
            Not registered?
            <Link
              to="/auth/sign-up"
              className="ml-1 text-[var(--color-primary)]"
            >
              Create account
            </Link>
          </Typography>
        </form>
      </div>

      {/* Right side image */}
      <div className="hidden h-full w-2/5 lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full rounded-3xl object-cover"
          alt="signin"
        />
      </div>
    </section>
  );
}

export default SignIn;
