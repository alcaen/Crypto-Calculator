// Title component
const Title: React.FC = ({}) => {
  return (
    <div className="flex items-center">
      <img
        className="h-32 w-32"
        src="https://covaxdata.com/wp/wp-content/uploads/2021/09/Blockchain-Color.gif"
        alt=""
      />
      <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tight ">
        <span className=" text-gray-300 transition hover:text-white">
          Crypto
        </span>
        <div className="relative inline">
          <span className="text-cyan-500 transition hover:text-cyan-400">
            Calculator
          </span>
          <div className="absolute -right-6 top-2 h-8 w-8 animate-ping rounded-full bg-white opacity-20"></div>
        </div>
      </h1>
    </div>
  );
};

export default Title;
