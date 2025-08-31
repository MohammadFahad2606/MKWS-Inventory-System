import React, { useState } from 'react';
import {
  Input,
  Checkbox,
  Button,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import API from '../../api/api'; // 👈 axios instance import

export function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  // ✅ submit handler with API call
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await API.post('/users/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(`Registration successful! Welcome ${res.data.name}`);
      reset(); // Clear form

      // ✅ Redirect to sign-in page after successful registration
      navigate('/auth/sign-in');
    } catch (err) {
      toast.error(`${err.response?.data?.message || 'Something went wrong'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-8 flex">
      {/* Left side image */}
      <div className="hidden h-full w-2/5 lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full rounded-3xl object-cover"
          alt="signup"
        />
      </div>

      {/* Right side form */}
      <div className="flex w-full flex-col items-center justify-center lg:w-3/5">
        <div className="text-center">
          <Typography
            variant="h2"
            className="mb-4 font-bold text-[var(--color-foreground)]"
          >
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            className="text-lg font-normal text-[var(--color-mutedForeground)]"
          >
            Fill in your details to create an account.
          </Typography>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-2 mt-8 w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            {/* Name */}
            <div>
              <Typography
                variant="small"
                className="mb-1 font-medium text-[var(--color-foreground)]"
              >
                Full Name
              </Typography>
              <Input
                size="lg"
                {...register('name', { required: 'Full name is required' })}
                placeholder="John Doe"
                className="text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-[var(--color-error)]">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Typography
                variant="small"
                className="mb-1 font-medium text-[var(--color-foreground)]"
              >
                Your email
              </Typography>
              <Input
                size="lg"
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter valid email',
                  },
                })}
                placeholder="name@mail.com"
                className="text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[var(--color-error)]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Typography
                variant="small"
                className="mb-1 font-medium text-[var(--color-foreground)]"
              >
                Password
              </Typography>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  size="lg"
                  {...register('password', {
                    required: 'Please enter your password',
                    validate: (value) =>
                      value.trim() !== '' || 'Please enter your password',
                  })}
                  placeholder="********"
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
                <p className="mt-1 text-sm text-[var(--color-error)]">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Terms */}
          <Checkbox
            {...register('terms', { required: 'You must agree to terms' })}
            label={
              <Typography
                variant="small"
                className="flex items-center justify-start font-medium text-[var(--color-foreground)]"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  className="font-normal text-[var(--color-foreground)] underline transition-colors hover:text-[var(--color-foreground)]"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: '-ml-2.5' }}
          />
          {errors.terms && (
            <p className="-mt-3 text-sm text-[var(--color-error)]">
              {errors.terms.message}
            </p>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="hover:bg-[var(--color-primary)]/90 mt-6 bg-[var(--color-primary)] text-[var(--color-primaryForeground)]"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register Now'}
          </Button>

          {/* Link to login */}
          <Typography
            variant="paragraph"
            className="mt-4 text-center font-medium text-[var(--color-foreground)]"
          >
            Already have an account?
            <Link
              to="/auth/sign-in"
              className="ml-1 text-[var(--color-primary)]"
            >
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
