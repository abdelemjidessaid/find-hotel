import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.SignIn, {
    onSuccess: async () => {
      showToast({ message: 'Sign in successful', type: 'SUCCESS' });
      await queryClient.invalidateQueries('validateToken');
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      className="flex flex-col gap-5 bg-green-200 bottom-1 border-gray-800 rounded-md py-8 px-10"
      onSubmit={onSubmit}
    >
      <h2 className="text-2xl font-semibold">Sign In</h2>

      {/* email input */}
      <label className="text-gray-700 flex-1 text-sm font-semibold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
          {...register('email', { required: '* This field is required !' })}
        ></input>
        {errors.email && (
          <span className="text-red-500 text-xs font-medium">
            {errors.email.message}
          </span>
        )}
      </label>
      {/* password input */}
      <label className="text-gray-700 flex-1 text-sm font-semibold">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
          {...register('password', {
            required: '* This field is required !',
            minLength: {
              value: 6,
              message: 'Password must be at lease 6 characters',
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500 text-xs font-medium">
            {errors.password.message}
          </span>
        )}
      </label>
      {/* button of login */}
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not registered ?{' '}
          <Link
            to="/register"
            className="underline hover:text-gray-800 transition-all ease-in-out duration-200"
          >
            Create an Account
          </Link>
        </span>
        <button className="bg-blue-600 rounded-md text-white text-sm p-2 font-semibold hover:bg-blue-500 transition-colors ease-in-out duration-200">
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
