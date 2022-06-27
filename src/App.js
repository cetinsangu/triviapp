import SetQuiz from './SetQuiz';
import { useContext } from 'react';
import { AppContext } from './Context';
import { GrLinkNext } from 'react-icons/gr';
import Loading from './Loading';
import Modal from './Modal';

function App() {
  const {
    setupScreen,
    loading,
    questions,
    currentQuestion,
    correctAnswer,
    nextQuestion,
    checkAnswer,
    isModalOpen,
  } = useContext(AppContext);

  if (setupScreen) {
    return <SetQuiz />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } =
    questions[currentQuestion];
  let answers = [...incorrect_answers];
  const randomIndex = Math.floor(Math.random() * 4);

  answers.splice(randomIndex, 0, correct_answer);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-poppins">
      <div className="container relative mx-auto flex w-4/5 items-center justify-center rounded-xl bg-white bg-opacity-40 p-5 backdrop-blur-lg md:w-full">
        <div className="absolute right-0 top-0 mr-5 mt-3 ">
          Correct Answers: {`${correctAnswer}/${currentQuestion}`}
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1
            dangerouslySetInnerHTML={{ __html: question }}
            className={`my-10 text-center text-2xl text-black`}
          />
          {answers.map((answer, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  checkAnswer(answer);
                }}
                dangerouslySetInnerHTML={{ __html: answer }}
                className="active:border-grey-900 active:text-grey-900 m-1 mt-5 w-2/3 rounded-xl border-indigo-600 bg-white px-5 py-3 text-sm  font-medium text-indigo-600 outline-none transition-all hover:border-2 hover:border-indigo-800 hover:text-indigo-800"
              ></button>
            );
          })}
          <div className="flex w-full justify-end">
            <button
              onClick={nextQuestion}
              className="active:bg-grey-900 mt-8 flex items-center justify-center rounded-xl bg-yellow-300 px-5 py-3 text-sm font-medium text-black transition-all hover:bg-yellow-500 focus:outline-none"
            >
              Next Question
              <GrLinkNext style={{ marginLeft: 5 }} />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
}

export default App;
