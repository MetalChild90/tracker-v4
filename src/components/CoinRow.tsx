import { useAppSelector } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { Link } from "react-router-dom";
import isTokenWatched from "../helpers/isTokenWatched";

function Coin({ coin }) {
  const watchedCoins = useAppSelector(
    (state: RootState) => state.coins.watchedCoins
  );

  return (
    <tr
      key={coin.id}
      className={`coins-list-item
      ${isTokenWatched(watchedCoins, coin.id) && "isWatched"}
      `}
    >
      <td>{coin.name}</td>
      <td>{coin.current_price}</td>
      <td>{coin.ath}</td>
      <td>
        {isTokenWatched(watchedCoins, coin.id) ? (
          "Already on the list"
        ) : (
          <Link to={`/selected-coin/${coin.id}`}>
            <button className="btn list-item-button">Select</button>
          </Link>
        )}
      </td>
      <td></td>
    </tr>
  );
}

export default Coin;
