import type { TColumnLiveCalculator } from "../types/prices.types";

const Calculator: React.FC<{ coins: TColumnLiveCalculator[] | undefined }> = ({
  coins,
}) => {
  return (
    <div className="max-w-6xl rounded-lg bg-slate-950/60 p-3 text-gray-300">
      <div className="flex flex-row">
        <div className="flex flex-col justify-center font-semibold">
          <p>Fields</p>
          <p>Amount USD</p>
          <p>Anual Return %</p>
          <p>Coin Price LIVE</p>
          <p>Final Amount Year (USD)</p>
          <p>Final Amount Year (Crypto)</p>
        </div>
        {coins?.map((coin) => (
          <ColumnLiveCalculator
            monthRet={coin.monthRet}
            name={coin.name}
            price={coin.price}
          />
        ))}
      </div>
    </div>
  );
};

const ColumnLiveCalculator: React.FC<TColumnLiveCalculator> = ({
  monthRet,
  name,
  price,
}) => {
  return (
    <div className="flex flex-col items-center justify-center font-medium">
      <p>{name}</p>
      <input className="text-center" type="number" />
      <div>
        <p>{monthRet}%</p>
      </div>
      <div>
        <p>{price}</p>
      </div>
      <div>
        <p>5%</p>
      </div>
      <div>
        <p>5%</p>
      </div>
    </div>
  );
};

export default Calculator;
