import { FiMoreHorizontal } from "react-icons/fi";
import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { layoutActions } from "../store/layout";
import { coinsActions } from "../store/coins";
import { CoinInterface } from "../Interfaces";
import PriceTargetForm from "./PriceTargetForm";
import { scientificToDecimal } from "../helpers/currencyHelper";

interface CoinRowProps {
  coin: CoinInterface;
}

function WatchedCoinRow({ coin }: CoinRowProps) {
  const dispatch = useAppDispatch();
  const { editMode, selectedCoin } = useAppSelector(
    (state: RootState) => state.coins
  );

  const handleClick = () => {
    dispatch(layoutActions.openModal());
    dispatch(coinsActions.setSelectedCoin(coin));
  };

  return (
    <tr
      className={`item ${
        coin.distancePercent! >= 0
          ? "target-hitted"
          : coin.distancePercent! >= -10
          ? "alert-zone"
          : ""
      }`}
      key={coin.id}
    >
      <td>{coin.name}</td>
      <td>{scientificToDecimal(coin.price!) + "$"}</td>
      <td>
        {editMode && coin.id === selectedCoin?.id ? (
          <PriceTargetForm />
        ) : (
          scientificToDecimal(coin.priceTarget!) + "$"
        )}
      </td>
      <td>{coin.distancePercent}%</td>
      <td>
        <span>
          <FiMoreHorizontal className="cursor" onClick={handleClick} />
        </span>
      </td>
    </tr>
  );
}

export default WatchedCoinRow;
