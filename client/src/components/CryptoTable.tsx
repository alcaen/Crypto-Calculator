import type { TCoin } from "../types/prices.types";
import CoinRow from "./CoinRow";

interface CryptoTableProps {
  assets: TCoin[];
}

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

const CryptoTable: React.FC<CryptoTableProps> = ({ assets }) => {
  return (
    <table className="space table-auto border-collapse border text-gray-300">
      <thead>
        <tr className="text-sm uppercase">
          {columnsToUse.map((name, i) => (
            <th key={i}>{name}</th>
          ))}
        </tr>
      </thead>
      <LoadingRows assets={assets ? assets : undefined} />
    </table>
  );
};

interface LoadingRowsProps {
  assets: TCoin[] | undefined;
}

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
