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
    <div className="font-poppins flex justify-center items-center h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="rounded-xl relative container w-4/5  md:w-full  mx-auto bg-white bg-opacity-40 backdrop-blur-lg p-5 flex justify-center items-center">
        <div className="absolute right-0 top-0 mr-5 mt-3 ">
          Correct Answers: {`${correctAnswer}/${currentQuestion}`}
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1
            dangerouslySetInnerHTML={{ __html: question }}
            className={`text-center text-2xl text-black my-10`}
          />
          {answers.map((answer, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  checkAnswer(answer);
                }}
                dangerouslySetInnerHTML={{ __html: answer }}
                className="mt-5 w-2/3 px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white outline-none m-1  border-indigo-600 hover:border-2 hover:border-indigo-800 hover:text-indigo-800 active:border-grey-900 active:text-grey-900 transition-all"
              ></button>
            );
          })}
          <div className="w-full flex justify-end">
            <button
              onClick={nextQuestion}
              className="mt-8 px-5 py-3 flex items-center justify-center rounded-xl text-sm font-medium text-black bg-yellow-300 hover:bg-yellow-500 active:bg-grey-900 focus:outline-none transition-all"
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
