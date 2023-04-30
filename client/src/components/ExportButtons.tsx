import type { TCoin } from "../types/prices.types";
import { exportDataCSV, exportDataJSON } from "../utils/lib";

interface ExportButtonsProps {
  assets: TCoin[] | undefined;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ assets }) => {
  return (
    <div className="flex w-full items-center justify-end">
      <div className="mr-5 flex w-72 items-center justify-between">
        <button
          className="mb-3 rounded-md bg-zinc-950 p-2 font-semibold text-gray-300 transition hover:bg-zinc-900 disabled:bg-red-800/50"
          onClick={() => exportDataJSON(assets)}
          disabled={assets ? false : true}
        >
          Download JSON
        </button>
        <button
          className="mb-3 rounded-md bg-zinc-950 p-2 font-semibold text-gray-300 transition hover:bg-zinc-900 disabled:bg-red-800/50"
          onClick={() => exportDataCSV(assets)}
          disabled={assets ? false : true}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default ExportButtons;
