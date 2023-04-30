import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import io from "socket.io-client";
import {
  type TCoin,
  CoinSchema,
  type TColumnLiveCalculator,
} from "./types/prices.types";
import CoinRow from "./components/CoinRow";
import Calculator from "./components/Calculator";
import type { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { setCoins, updatePrice } from "./slices/pricesSlice";
import { exportDataJSON } from "./utils/exportData";

const socket = io("http://localhost:8000");

function App() {
  const dispatch = useDispatch();
  const [assets, setAssets] = useState<TCoin[]>();
  const calValues = useSelector((state: RootState) => state.priceReducer);

  useEffect(() => {
    socket.on("prices", (serverPrices: TCoin[]) => setAssets(serverPrices));

    assets?.map((coin) => {
      dispatch(
        updatePrice({
          name: coin.name,
          price: String(coin.metrics.market_data.price_usd),
        })
      );
    });

    // return () => {
    //   socket.off("price", (serverPrice: string) => setPrice(serverPrice));
    // };
  }, [assets]);

  useEffect(() => {
    dispatch(setCoins([{ name: "Cardano", monthRet: "5%", price: "5" }]));
  }, []);

  const columnsToUse = [
    "Logo",
    "Asset",
    "Price",
    "Reported marketcap",
    "CHANGE VS USD (1h)",
    "CHANGE VS USD (24h)",
    "CHANGE VS USD (1d)",
    "CHANGE VS USD (7d)",
    "CHANGE VS USD (30d)",
    "CHANGE VS USD (ytd)",
    "All time high",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-10 bg-gradient-to-b from-slate-950 to-cyan-950 py-5 font-sans">
      <h1 className="text-5xl font-semibold text-white">Test</h1>
      <Calculator coins={calValues} />
      <div>{JSON.stringify(calValues)}</div>
      <div className="max-w-5xl rounded bg-slate-100/5 p-3">
        <div className="flex w-full items-center justify-end">
          <div className="mr-5 flex w-72 items-center justify-between">
            <button
              className="mb-3 rounded-md bg-zinc-950 p-2 font-semibold text-gray-300 transition hover:bg-zinc-900 disabled:bg-red-800/50"
              onClick={() => exportDataJSON(assets)}
              disabled={assets ? false : true}
            >
              Download JSON
            </button>
            <button className="mb-3 rounded-md bg-zinc-950 p-2 font-semibold text-gray-300 transition hover:bg-zinc-900">
              Download CSV
            </button>
          </div>
        </div>
        <table className="space table-auto border-collapse border text-gray-300">
          <thead>
            <tr className="text-sm uppercase">
              {columnsToUse.map((name, i) => (
                <th key={i}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assets?.map((asset) => (
              <CoinRow coin={asset} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
