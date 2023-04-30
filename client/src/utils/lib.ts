import type { TCoin, TReturn } from "../types/prices.types";

import exportFromJSON from "export-from-json";

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

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export const compact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});
