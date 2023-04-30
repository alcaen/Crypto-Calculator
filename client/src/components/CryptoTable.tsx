import type { TCoin } from "../types/prices.types";
import CoinRow from "./CoinRow";

interface CryptoTableProps {
  assets: TCoin[];
}

// Columns selected to use if want to use more hifhly recomend an endpoint that provide them
const columnsToUse = [
  "Logo",
  "Asset",
  "Price",
  "Reported marketcap",
  "real volume last (24h)",
  "CHANGE VS USD (1h)",
  "CHANGE VS USD (24h)",
  "CHANGE VS USD (7d)",
  "CHANGE VS USD (30d)",
  "CHANGE VS USD (ytd)",
  "All time high",
];
// This only shows if assets are avaliable
const CryptoTable: React.FC<CryptoTableProps> = ({ assets }) => {
  return (
    <table className="space table-auto border-collapse border text-gray-300">
      <thead>
        {/* Put the cols inside the headers of the table */}
        <tr className="text-sm uppercase">
          {columnsToUse.map((name, i) => (
            <th key={i}>{name}</th>
          ))}
        </tr>
      </thead>
      {/* Thte body came from the custom component LoadingRows */}
      <LoadingRows assets={assets ? assets : undefined} />
    </table>
  );
};

interface LoadingRowsProps {
  assets: TCoin[] | undefined;
}

// Only shows if assets are avaliable ( Code more readable when we separe in different components)
const LoadingRows: React.FC<LoadingRowsProps> = ({ assets }) => {
  if (!assets) {
    return null;
  }
  return (
    <tbody>
      {assets.map((asset) => (
        <CoinRow coin={asset} />
      ))}
    </tbody>
  );
};

export default CryptoTable;
