import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

// time 2:37

// create register form data
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  // create register form data instance
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // create mutation
  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({
        message: 'Registration done successfully.',
        type: 'SUCCESS',
      });
      await queryClient.invalidateQueries('validateToken');
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: 'ERROR',
      });
    },
  });

  // create submit data handler
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  // return the registration form
  return (
    <form
      className="flex flex-col gap-5 bg-green-200 bottom-1 border-gray-800 rounded-md py-8 px-10"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-semibold">Create an Account</h2>
      {/* first and last names */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* first name input  */}
        <label className="text-gray-700 flex-1 text-sm font-semibold">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
            {...register('firstName', {
              required: '* This field is required !',
            })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500 text-xs font-medium">
              {errors.firstName.message}
            </span>
          )}
        </label>
        {/* last name input  */}
        <label className="text-gray-700 flex-1 text-sm font-semibold">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
            {...register('lastName', {
              required: '* This field is required !',
            })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500 text-xs font-medium">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
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
      {/* password confirmation input */}
      <label className="text-gray-700 flex-1 text-sm font-semibold">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
          {...register('confirmPassword', {
            validate: (val) => {
              if (!val) {
                return 'This field is required !';
              } else if (watch('password') !== val) {
                return 'Your password do not match !!';
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs font-medium">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      {/* button of create account */}
      <span>
        <button className="bg-blue-600 rounded-md text-white text-sm p-2 font-semibold hover:bg-blue-500 transition-colors ease-in-out duration-200">
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
