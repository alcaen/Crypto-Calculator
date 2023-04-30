import { TCoin } from "@/types/prices.types";

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
