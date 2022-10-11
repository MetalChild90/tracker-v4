import { FiMoreHorizontal } from "react-icons/fi";
import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { layoutActions } from "../store/layout";
import { coinsActions } from "../store/coins";
import PriceTargetForm from "./PriceTargetForm";
import { Root } from "react-dom/client";

function WatchedCoinRow({ coin }) {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state: RootState) => state.coins.editMode);
  const selectedCoin = useAppSelector(
    (state: RootState) => state.coins.selectedCoin
  );

  const handleClick = () => {
    dispatch(layoutActions.openModal());
    dispatch(coinsActions.setSelectedCoin(coin));
  };

  return (
    <tr
      className={`item ${
        coin.distancePercent >= 0
          ? "target-hitted"
          : coin.distancePercent >= -10
          ? "alert-zone"
          : ""
      }`}
      key={coin.id}
    >
      <td>{coin.name}</td>
      <td>{coin.price}</td>
      <td>
        {editMode && coin.id === selectedCoin?.id ? (
          <PriceTargetForm />
        ) : (
          coin.priceTarget + "$"
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
