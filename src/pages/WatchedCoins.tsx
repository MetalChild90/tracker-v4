import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import { coinsActions } from "../store/coins";
import type { RootState } from "../store/index";
import WatchedCoinRow from "../components/WatchedCoinRow";
import ActionsModal from "../components/ActionsModal";
import CoinCard from "../components/CoinCard";
import Spinner from "../components/Spinner";
import useWindowDimensions from "../hooks/useWindowDimensions";
import getUpdateWatchedCoinsData from "../helpers/getUpdateWatchedCoinsData";

import { CoinInterface } from "../Interfaces";

function WatchedCoins() {
  const dispatch = useAppDispatch();
  const { watchedCoins, loading } = useAppSelector(
    (state: RootState) => state.coins
  );
  const openModal = useAppSelector(
    (state: RootState) => state.layout.openModal
  );
  const priceTarget = useAppSelector(
    (state: RootState) => state.coins.priceTarget
  );

  const [updatedWatchedCoins, setUpdatedWatchedCoins] = useState<
    CoinInterface[]
  >([]);
  const [sortedWatchedCoins, setSortedWatchedCoins] = useState<CoinInterface[]>(
    []
  );

  const { width } = useWindowDimensions();

  useEffect(() => {
    async function getCoinsData() {
      const fetchedCoins: CoinInterface[] = await getUpdateWatchedCoinsData(
        watchedCoins
      );
      setUpdatedWatchedCoins(fetchedCoins);
    }

    const interval = setInterval(() => {
      getCoinsData();
    }, 60000);

    dispatch(coinsActions.setLoading());

    getCoinsData();

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [priceTarget, watchedCoins]);

  useEffect(() => {
    const sortedWatchedCoins = updatedWatchedCoins.sort(
      (a, b) => b.distancePercent! - a.distancePercent!
    );
    setSortedWatchedCoins(sortedWatchedCoins);
    dispatch(coinsActions.cancelLoading());
    // eslint-disable-next-line
  }, [updatedWatchedCoins]);

  return (
    <div>
      <h2 className="title watched-coins-title">Watched tokens</h2>

      {sortedWatchedCoins.length === 0 ? (
        <p className="no-coins-info">No watched coins yet</p>
      ) : (
        <div className="coins-list">
          {loading ? (
            <Spinner />
          ) : width > 992 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Price Target</th>
                  <th>Distance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedWatchedCoins.map((coin) => (
                  <WatchedCoinRow key={coin.id} coin={coin} />
                ))}
              </tbody>
            </table>
          ) : (
            sortedWatchedCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} type="watched" />
            ))
          )}
          {openModal && <ActionsModal />}
        </div>
      )}
    </div>
  );
}

export default WatchedCoins;
