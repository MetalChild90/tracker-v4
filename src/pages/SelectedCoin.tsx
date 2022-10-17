import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { useParams, useNavigate } from "react-router-dom";
import { getCoin } from "../store/coinsService";
import { coinsActions } from "../store/coins";
import CoinCard from "../components/CoinCard";
import Spinner from "../components/Spinner";

function SelectedCoin() {
  const dispatch = useAppDispatch();
  const { loading, selectedCoin } = useAppSelector(
    (state: RootState) => state.coins
  );

  const params = useParams();
  const navigate = useNavigate();

  console.log(params.id);

  useEffect(() => {
    console.log("uE work");
    const fetchCoin = async () => {
      console.log("Selected work");
      dispatch(coinsActions.setLoading());
      const coin = await getCoin(params.id!);
      console.log(coin);
      dispatch(coinsActions.setSelectedCoin(coin!));
    };

    fetchCoin();

    // eslint-disable-next-line
  }, [params.id]);

  const closeSelectedCoin = () => {
    dispatch({ type: "REMOVE_SELECTED_COIN" });
    navigate("/");
  };

  if (loading) {
    return <Spinner />;
  }

  if (selectedCoin) {
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

  return <p>We are working on that</p>;
}

export default SelectedCoin;
