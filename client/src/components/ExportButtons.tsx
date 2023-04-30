import { FileJson2, FileType2 } from "lucide-react";
import type { TCoin } from "../types/prices.types";
import { exportDataCSV, exportDataJSON } from "../utils/lib";

// Buttons only export data if is data avaliable otherwise these are disabled with red color
interface ExportButtonsProps {
  assets: TCoin[] | undefined;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ assets }) => {
  return (
    <div className="flex w-full items-center justify-end">
      <div className="space mr-5 flex w-80 items-center justify-between">
        <button
          className="mb-3 flex space-x-1 rounded-md bg-zinc-950 p-2 font-semibold text-gray-300 transition hover:bg-zinc-900 disabled:bg-red-800/50"
          onClick={() => exportDataJSON(assets)}
          disabled={assets ? false : true}
        >
          <FileJson2 />
          <p className="whitespace-nowrap	">Export JSON</p>
        </button>
        <button
          className="mb-3 flex space-x-1 rounded-md bg-zinc-950 p-2 font-semibold text-gray-300 transition hover:bg-zinc-900 disabled:bg-red-800/50"
          onClick={() => exportDataCSV(assets)}
          disabled={assets ? false : true}
        >
          <FileType2 />
          <p className="whitespace-nowrap	"> Export CSV</p>
        </button>
      </div>
    </div>
  );
};

export default ExportButtons;
