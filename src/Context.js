import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

// special values for the API, categories and values
const categoryValues = {
  'General Knowledge': 9,
  'Entertainment: Books': 10,
  'Entertainment: Film': 11,
  'Entertainment: Music': 12,
  'Entertainment: Musicals & Theatres': 13,
  'Entertainment: Television': 14,
  'Entertainment: Video Games': 15,
  'Entertainment: Board Games': 16,
  'Science & Nature': 17,
  'Science: Computers': 18,
  'Science: Mathematics': 19,
  Mythology: 20,
  Sports: 21,
  Geography: 22,
  History: 23,
  Politics: 24,
  Art: 25,
  Celebrities: 26,
  Animals: 27,
  Vehicles: 28,
  Entertainment: 29,
  'Science and Nature': 30,
  Vehicles: 31,
  Computers: 32,
  Mathematics: 33,
  Celebrities: 34,
  'Vehicles: Automobiles': 35,
  'Vehicles: Motorcycles': 36,
  'Vehicles: Other Vehicles': 37,
  'Vehicles: Boat': 38,
  'Vehicles: Train': 39,
  'Vehicles: Airplane': 40,
  'Vehicles: Bus': 41,
  'Vehicles: Truck': 42,
  'Vehicles: Subway': 43,
  'Vehicles: Rail': 44,
  'Vehicles: Tram': 45,
};

const AppProvider = ({ children }) => {
  const [setupScreen, setSetupScreen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [error, setError] = useState(false);
  const [quizValues, setQuizValues] = useState({
    questionAmount: 20,
    category: 'General Knowledge',
    difficulty: 'easy',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    // when the user clicks the start button, set the setupScreen to false, and set the loading to true. This will show the loading screen, an animated svg.
    setLoading(true);
    setSetupScreen(false);
    const response = await axios(url).catch((err) => console.log(err));
    // if there is a response, set the questions. if not, set the setup screen to true again.
    if (response) {
      // if response is not empty, set the questions. If not, set the setup screen to true again and set the error to true.
      if (response?.data?.results?.length > 0) {
        setQuestions(response?.data?.results);
        setLoading(false);
        setSetupScreen(false);
        setError(false);
      } else {
        setSetupScreen(true);
        setError(true);
      }
    } else {
      setSetupScreen(true);
    }
  };
  //move to the next question, if the current question is the last question, finish the quiz
  const nextQuestion = () => {
    setCurrentQuestion((cur) => {
      const currentQuestion = cur + 1;
      if (cur === questions.length - 1) {
        setIsModalOpen(true);
        return 0;
      }
      return currentQuestion;
    });
  };

  // when the quiz is finished, reset the state, and show the setup screen, so the user can start a new quiz
  const playAgain = () => {
    setIsModalOpen(false);
    // setCurrentQuestion(0);
    setCorrectAnswer(0);
    // setQuestions([]);
    setSetupScreen(true);
  };

  // checking the correct answer, and incrementing the correct answer counter
  const checkAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setCorrectAnswer((cur) => cur + 1);
    }
    nextQuestion();
  };

  // setting the quiz values, matching the category, difficulty and amount of questions to the values in the state
  const handleChange = (e) => {
    setQuizValues({ ...quizValues, [e.target.name]: e.target.value });
  };

  // when the user clicks the start button, fetch the questions from the API. The API is called with the values in the state, and the questions are fetched. If the questions are fetched, the setup screen is hidden, and the quiz is started. If the questions are not fetched, the setup screen is shown, and the user is notified of an error. The error is also shown in the setup screen.
  const handleSubmit = (e) => {
    e.preventDefault();
    const { questionAmount, category, difficulty } = quizValues;
    const url = `https://opentdb.com/api.php?amount=${questionAmount}&category=${categoryValues[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        setupScreen,
        loading,
        questions,
        currentQuestion,
        correctAnswer,
        error,
        isModalOpen,
        quizValues,
        nextQuestion,
        checkAnswer,
        handleChange,
        handleSubmit,
        categoryValues,
        playAgain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
