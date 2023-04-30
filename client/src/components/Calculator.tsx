import { DollarSign, RefreshCw } from "lucide-react";
import type { TReturn } from "../types/prices.types";
import { useDispatch } from "react-redux";
import { setCoins } from "../slices/pricesSlice";
import { useEffect, useState } from "react";
import { formatter } from "../utils/lib";
import LoadingSpiner from "./LoadingSpiner";

const Calculator: React.FC<{ coins: TReturn[] | undefined }> = ({ coins }) => {
  // we update the global store from the component
  const dispatch = useDispatch();
  // Refresh state for the prices the button on the righ
  const [refresh, setRefresh] = useState(false);
  // Handle all input values from a single state
  const [inputPrice, setInputPrice] = useState<{
    [key: string]: string | undefined;
  }>({});

  // When component mounts fetch the REST endpoint /monthReturn then set its value to the global store
  useEffect(() => {
    const fetchReturns = async ({ url }: { url: string }) => {
      const response: Response = await fetch(url);
      // Send the error if something happend
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = (await response.json()) as TReturn[];
      dispatch(setCoins(data));
    };

    fetchReturns({ url: "http://localhost:8000/monthReturn" }).catch((error) =>
      console.log(error)
    );
    // When refresh change state update the price and the moth interest like a limit order
  }, [refresh]);

  return (
    <div className="flex w-full max-w-7xl justify-center">
      <div className=" rounded-lg bg-slate-950/60 p-3 text-gray-300">
        <div className="flex flex-row">
          <div className="flex flex-col justify-center font-semibold">
            <p className="h-7 text-lg font-bold">Fields</p>
            <p>Amount USD</p>
            <p>Monthly Return %</p>
            <p>Coin Price LIVE</p>
            <p>Final Return Year (USD)</p>
            <p>Final Return Year (Crypto)</p>
          </div>
          {/* If coin avaliable */}
          {coins?.length ? (
            // map coins into the colums with the required info
            coins?.map((coin) => (
              <ColumnLiveCalculator
                id={coin.id}
                monthRet={coin.monthRet}
                name={coin.name}
                price={coin.price}
                investAmount={inputPrice}
                setInvestAmount={setInputPrice}
              />
            ))
          ) : (
            <div className="ml-5 flex w-96 animate-pulse items-center justify-center rounded-lg bg-gray-100/20">
              {/* If no data or data loading show the loading sppiner */}
              <LoadingSpiner />
            </div>
          )}
          <div className="ml-2 flex w-32 items-center justify-center rounded-lg bg-slate-900/20">
            {/* Refesh button used to change the refresh state to update info */}
            <button
              className="group rounded-lg border-2 border-gray-300 p-1 transition hover:bg-gray-500/30 active:bg-gray-400/50"
              onClick={() => setRefresh(!refresh)}
            >
              <RefreshCw className="stroke-white transition duration-[800ms] group-hover:rotate-[360deg]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// Types with & means extend it with new fields in this case is the return type from the back + the amount to invest + the dispatcher
const ColumnLiveCalculator: React.FC<
  TReturn & {
    investAmount: { [key: string]: string | undefined };
    setInvestAmount: React.Dispatch<
      React.SetStateAction<{ [key: string]: string | undefined }>
    >;
  }
> = ({ monthRet, name, price, investAmount, setInvestAmount, id }) => {
  return (
    <div className="flex flex-col items-center justify-center font-medium">
      <div className="flex h-8 space-x-1">
        {/* Logos came from the API with the coin ID */}
        <img
          className="h-6 w-6"
          src={`https://asset-images.messari.io/images/${id}/32.png?v=2`}
          alt={`${name} logo`}
        />
        <p>{name}</p>
      </div>
      <div className="mx-2 flex items-center">
        <input
          className="rounded-l-md border border-gray-400 bg-slate-700/30 text-center"
          type="number"
          placeholder="Amount to invest"
          // set invest amount only where the key === name and the value is the input value
          onChange={(e) =>
            setInvestAmount({ ...investAmount, [name]: e.target.value })
          }
          // value is the investamount in the key name
          value={investAmount[name]}
        />
        <div className="flex h-full items-center rounded-r-md bg-gray-300 px-1">
          {/* Lucide Icons pretty good */}
          <DollarSign size={18} className="rounded-full bg-green-700" />
        </div>
      </div>
      <div>
        <p>{monthRet}%</p>
      </div>
      <div>
        {/* Use the function formmater from the lib to show correct format */}
        <p>{formatter.format(price)}</p>
      </div>
      <div>
        {finalAmmountYear({
          current_price: price,
          month_return: monthRet,
          USD_ammount: Number(investAmount[name]),
        })}
      </div>
      <div>
        {finalCrypto({
          id: id,
          current_price: price,
          month_return: monthRet,
          USD_ammount: Number(investAmount[name]),
          fixedDigits: 7,
        })}
      </div>
    </div>
  );
};

type TFinnance = {
  current_price: number;
  month_return: number;
  USD_ammount: number;
};

// Calulus for the compound interest in a year given the montly return
const finalAmmountYear = ({
  current_price,
  month_return,
  USD_ammount,
}: TFinnance) => {
  const compoundInterest = formatter.format(
    USD_ammount * (1 + month_return / 100) ** 12
  );
  if (isNaN(USD_ammount * (1 + month_return / 100) ** 12)) {
    // if input is not provided the result is Nan so we display a helper {Enter an amount to beggin}
    return (
      <div>
        <p className="text-sm text-red-700">Enter an amount to beggin</p>
      </div>
    );
  }
  return (
    // Show the compond interest for each coin
    <div className="flex items-center space-x-1">
      <p className="text-green-600">{compoundInterest}</p>
      <DollarSign size={18} className="rounded-full bg-green-700" />
    </div>
  );
};

const finalCrypto = ({
  id,
  current_price,
  month_return,
  USD_ammount,
  fixedDigits,
}: TFinnance & { fixedDigits: number; id: string }) => {
  const ammount = USD_ammount / current_price;

  // Same case gere if we dont have an input display helper {Enter an amount to beggin}
  if (isNaN(ammount)) {
    return (
      <div>
        <p className="text-sm text-red-700">Enter an amount to beggin</p>
      </div>
    );
  }
  // The ammount in crypto that the input in dollar buy
  return (
    <div className="flex items-center space-x-1">
      <p className="text-cyan-500">{Number(ammount.toFixed(fixedDigits))}</p>
      <img
        className="h-5 w-5"
        src={`https://asset-images.messari.io/images/${id}/32.png?v=2`}
        alt={`${id} logo`}
      />
    </div>
  );
};

export default Calculator;
