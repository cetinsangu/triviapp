import { useContext } from 'react';
import { AppContext } from './Context';

const Modal = () => {
  const { playAgain, correctAnswer, questions } = useContext(AppContext);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-modal flex justify-center items-center z-10">
      <div className="w-3/5 bg-white rounded-xl flex items-center justify-center flex-col p-10">
        <h1 className="text-xl mb-5">Congratulations!</h1>
        <p className="text-lg text-center">
          You got <span className="mx-2 text-3xl">{correctAnswer}</span> out of
          <span className="mx-2 text-3xl">{questions.length}</span>
          questions correct. Your success rate is
          <span className="mx-2 text-3xl">
            {((correctAnswer / questions.length) * 100).toFixed(0)}%.
          </span>
        </p>
        <button
          onClick={playAgain}
          className="mt-8 px-5 py-3 text-center rounded-xl text-sm font-medium text-black bg-fuchsia-400 hover:bg-fuchsia-600 active:bg-grey-900 focus:outline-none border-4 border-white focus:border-fuchsia-800 transition-all"
        >
          Play Again!
        </button>
      </div>
    </div>
  );
};

export default Modal;
