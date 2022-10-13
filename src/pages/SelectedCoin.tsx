import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { useParams, useNavigate } from "react-router-dom";
import { getCoin } from "../AppActions";
import { coinsActions } from "../store/coins";
import CoinCard from "../components/CoinCard";
import Spinner from "../components/Spinner";

function SelectedCoin() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.coins.loading);
  const selectedCoin = useAppSelector(
    (state: RootState) => state.coins.selectedCoin
  );

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoin = async () => {
      dispatch(coinsActions.setLoading());
      const coin = await getCoin(params.id!);
      dispatch(coinsActions.setSelectedCoin(coin!));
    };

    fetchCoin();
  }, [params.id, dispatch]);

  const closeSelectedCoin = () => {
    dispatch({ type: "REMOVE_SELECTED_COIN" });
    navigate("/");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="selected-coin-box">
      <h2 className="title">Add coin to watched list</h2>
      <CoinCard
        coin={selectedCoin!}
        type="selected"
        handleClose={closeSelectedCoin}
      />
    </div>
  );
}

export default SelectedCoin;
