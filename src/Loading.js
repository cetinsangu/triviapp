import loader from './items/loading.svg';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <img src={loader} alt="loading" />
    </div>
  );
};

export default Loading;
