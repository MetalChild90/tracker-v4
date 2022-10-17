import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { Link } from "react-router-dom";
import PriceTargetForm from "./PriceTargetForm";
import isTokenWatched from "../helpers/isTokenWatched";
import { layoutActions } from "../store/layout";
import { coinsActions } from "../store/coins";
import { CoinInterface } from "../Interfaces";
import { scientificToDecimal } from "../helpers/currencyHelper";

interface CoinCardProps {
  coin: CoinInterface;
  type: string;
  handleClose?: () => void;
}

function CoinCard({ coin, type, handleClose }: CoinCardProps) {
  const dispatch = useAppDispatch();
  const { editMode, watchedCoins, selectedCoin } = useAppSelector(
    (state: RootState) => state.coins
  );

  console.log(selectedCoin);

  const handleCoinActiveButtons = () => {
    dispatch(layoutActions.openModal());
    dispatch(coinsActions.setSelectedCoin(coin));
  };

  return (
    <div
      className={`coin-box 
    ${
      isTokenWatched(watchedCoins, coin.id!) &&
      type === "allcoins" &&
      "isWatched"
    } ${
        coin.distancePercent! >= 0
          ? "target-hitted"
          : coin.distancePercent! >= -10
          ? "alert-zone"
          : ""
      }
        `}
    >
      <div className="info-box">
        {type !== "watched" && (
          <span onClick={handleClose} className="close-selected-box">
            &times;
          </span>
        )}
        <p className="feature-title">Name</p>
        <span className="feature-value">{coin.name}</span>
        <p className="feature-title">Price</p>
        <span className="feature-value">
          {scientificToDecimal(coin.price!) + "$"}
        </span>
        <p className="feature-title">
          {type === "allcoins"
            ? "ATH"
            : type === "watched"
            ? "Price Target"
            : type === "selected"
            ? "Set price target"
            : editMode
            ? "Set new price target"
            : ""}
        </p>
        <span className="feature-value">
          {type === "allcoins" ? (
            coin.ath
          ) : type === "selected" ||
            (editMode && selectedCoin?.id === coin.id) ? (
            <PriceTargetForm type={type} />
          ) : type === "watched" ? (
            scientificToDecimal(coin.priceTarget!) + "$"
          ) : (
            ""
          )}
        </span>
        {type === "watched" && (
          <>
            <p className="feature-title">Distance</p>
            <span className="feature-value">{coin.distancePercent}%</span>
          </>
        )}
      </div>
      <div>
        {type === "allcoins" &&
          (isTokenWatched(watchedCoins, coin.id!) ? (
            "Already on the list"
          ) : (
            <Link to={`/selected-coin/${coin.id}`}>
              <button className="btn list-item-button">Select</button>
            </Link>
          ))}
        {type === "watched" && !editMode && (
          <button onClick={handleCoinActiveButtons} className="btn">
            More
          </button>
        )}
      </div>
    </div>
  );
}

export default CoinCard;
