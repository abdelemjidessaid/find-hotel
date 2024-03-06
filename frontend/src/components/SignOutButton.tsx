import { useMutation, useQueryClient } from 'react-query';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      // show toast
      showToast({ message: 'Sign out successful', type: 'SUCCESS' });
    },
    onError: (error: Error) => {
      // show toast
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-teal-700 px-3 font-semibold text-sm bg-white rounded-md hover:bg-gray-100 transition-all ease-in-out duration-300"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
