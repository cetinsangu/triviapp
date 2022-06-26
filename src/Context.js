import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

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
    setLoading(true);
    setSetupScreen(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
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

  const playAgain = () => {
    setIsModalOpen(false);
    // setCurrentQuestion(0);
    setCorrectAnswer(0);
    // setQuestions([]);
    setSetupScreen(true);
  };

  const checkAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setCorrectAnswer((cur) => cur + 1);
    }
    nextQuestion();
  };

  const handleChange = (e) => {
    setQuizValues({ ...quizValues, [e.target.name]: e.target.value });
  };

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
