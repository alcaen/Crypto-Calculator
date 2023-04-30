import { type TCoin } from "../types/prices.types";
import { compact, formatter } from "../utils/lib";

interface CoinRowProps {
  coin: TCoin;
}

const CoinRow: React.FC<CoinRowProps> = ({ coin }) => {
  // Values selected for the heders in CryptoTable
  const changes = [
    {
      name: "change1H",
      change: coin.metrics.market_data.percent_change_usd_last_1_hour,
    },
    {
      name: "change24H",
      change: coin.metrics.market_data.percent_change_usd_last_24_hours,
    },
    {
      name: "change7D",
      change: coin.metrics.roi_data.percent_change_last_1_week,
    },
    {
      name: "change1M",
      change: coin.metrics.roi_data.percent_change_last_1_month,
    },
    {
      name: "changeYTD",
      change: coin.metrics.roi_data.percent_change_last_1_year,
    },
  ];

  return (
    <tr className="h-12 border border-gray-200 text-center font-medium">
      <td className="">
        <div className="flex w-14 items-center justify-center p-2">
          {/* Logos came from the API with the coin ID */}
          <img
            className=" rounded-full"
            src={`https://asset-images.messari.io/images/${coin.id}/32.png?v=2`}
            alt={coin.id}
          />
        </div>
      </td>
      <td>
        <p className="w-32">
          {coin.name} - {coin.symbol}
        </p>
      </td>
      <td>{formatter.format(coin.metrics.market_data.price_usd)}</td>
      <td>{compact.format(coin.metrics.marketcap.current_marketcap_usd)}</td>
      <td>
        {compact.format(coin.metrics.market_data.real_volume_last_24_hours)}
      </td>
      {/* For the price changes i use dinamic colors red if is down green if is up this way i can see how i lose my doges on real time */}
      {changes.map((interval) => (
        <td
          key={interval.name}
          className={interval.change < 0 ? "text-red-700" : "text-green-700"}
        >
          {/* Only first two decimal digits avaliable */}
          {interval.change.toFixed(2)}%
        </td>
      ))}
      <td>{formatter.format(coin.metrics.all_time_high.price)}</td>
    </tr>
  );
};

export default CoinRow;
