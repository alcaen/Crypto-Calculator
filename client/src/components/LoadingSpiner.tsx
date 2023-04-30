const LoadingSpiner: React.FC = ({}) => {
  return (
    <div className="relative flex items-center justify-center">
      <p className="text-xl font-semibold text-gray-300">Loading...</p>
      <div className="absolute -top-10 inline-block h-28 w-28 animate-spin rounded-full border-[3px] border-current border-t-transparent text-cyan-500"></div>
    </div>
  );
};

export default LoadingSpiner;
