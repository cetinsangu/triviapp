import { useContext } from 'react';
import { AppContext } from './Context';

const ErrorModal = () => {
  const { errorHandle } = useContext(AppContext);
  return (
    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-modal">
      <div className="flex w-3/5 flex-col items-center justify-center rounded-xl bg-white bg-opacity-10 p-10 backdrop-blur-lg">
        <h1 className="mb-5 text-3xl text-white">ERROR!</h1>
        <p className="text-center text-lg text-white">
          Oops! An error occurred. Please enter a different value.
        </p>
        <button
          onClick={errorHandle}
          className="active:bg-grey-900 mt-8 rounded-xl bg-fuchsia-400 px-5 py-3 text-center text-sm font-medium text-black transition-all hover:bg-fuchsia-600 focus:border-fuchsia-800 focus:outline-none"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
