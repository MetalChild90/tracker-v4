import { useEffect } from "react";
import { getCoins } from "../store/coinsService";
import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { coinsActions } from "../store/coins";
import Pagination from "../components/Pagination";
import useWindowDimensions from "../hooks/useWindowDimensions";
import CoinRow from "../components/CoinRow";
import CoinCard from "../components/CoinCard";
import Spinner from "../components/Spinner";

function Coins() {
  const dispatch = useAppDispatch();
  const { coins, loading } = useAppSelector((state: RootState) => state.coins);
  const currentPage = useAppSelector(
    (state: RootState) => state.pagination.currentPage
  );

  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchCoins = async () => {
      dispatch(coinsActions.setLoading());
      const coins = await getCoins(currentPage);
      dispatch(coinsActions.getCoins(coins));
    };
    fetchCoins();
  }, [currentPage, dispatch]);

  return (
    <div>
      <h2>Select coin from a list:</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="coins-list">
          {width > 992 ? (
            <table className="coins-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>ATH</th>
                  <th>Select</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {coins!.map((coin) => (
                  <CoinRow key={coin.id} coin={coin} />
                ))}
              </tbody>
            </table>
          ) : (
            coins!.map((coin) => (
              <CoinCard key={coin.id} coin={coin} type="allcoins" />
            ))
          )}

          <Pagination />
        </div>
      )}
    </div>
  );
}

export default Coins;
