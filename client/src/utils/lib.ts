// Utilities to handle data or process data

import type { TCoin } from "../types/prices.types";

import exportFromJSON from "export-from-json";

// Export the assets to a JSON file called data.json
export const exportDataJSON = (assets: TCoin[] | undefined) => {
  if (assets) {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(assets)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  }
};

// Export the assets to a CSV file called data.csv
export const exportDataCSV = (assets: TCoin[] | undefined) => {
  if (assets) {
    const data = assets;
    const fileName = "download";
    // This library does not have types so i disable ts and eslint
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const exportType = exportFromJSON.types.csv;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    exportFromJSON({ data, fileName, exportType });
  }
};

// Format the currencies with 2 decimals to the usd standard
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
// Format the currencies with compact design (Billions Millions) to the usd standard
export const compact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});
