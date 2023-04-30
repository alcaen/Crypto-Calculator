import { useState, useEffect } from "react";
import io from "socket.io-client";
import { type TCoin } from "./types/prices.types";
import Calculator from "./components/Calculator";
import type { RootState } from "./store";
import { useSelector } from "react-redux";
import Title from "./components/Title";
import ExportButtons from "./components/ExportButtons";
import LoadingSpiner from "./components/LoadingSpiner";
import CryptoTable from "./components/CryptoTable";

const socket = io("http://localhost:8000");

function App() {
  // State that handles the assets that came from the websocket
  const [assets, setAssets] = useState<TCoin[]>();
  // The calculator values come from the global store with redux
  const calValues = useSelector((state: RootState) => state.priceReducer);
  // Use effect charge data from socket when component mounts
  useEffect(() => {
    socket.on("prices", (serverPrices: TCoin[]) => setAssets(serverPrices));
    // return () => {
    //   socket.off("price", (serverPrice: string) => setPrice(serverPrice));
    // };
  }, [assets]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-10 bg-gradient-to-b from-slate-950 to-cyan-950 py-5 font-sans">
      {/* Title Component */}
      <Title />
      {/* Calculator Component */}
      <Calculator coins={calValues} />
      <div className="w-full max-w-6xl rounded bg-slate-100/5 p-3">
        {/* Export to JSON & CSV Component */}
        <ExportButtons assets={assets ? assets : undefined} />
        {assets ? (
          // Table of Cryptos Component
          <CryptoTable assets={assets} />
        ) : (
          <div className="flex h-32 animate-pulse items-center justify-center rounded-lg bg-gray-100/20">
            {/* Loading State if assets are not avaliable */}
            <LoadingSpiner />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
