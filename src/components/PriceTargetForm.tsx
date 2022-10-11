import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { coinsActions } from "../store/coins";

function PriceTargetForm({ type }) {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state: RootState) => state.coins.editMode);
  const watchedCoins = useAppSelector(
    (state: RootState) => state.coins.watchedCoins
  );
  const selectedCoin = useAppSelector(
    (state: RootState) => state.coins.selectedCoin
  );

  const [priceTarget, setPriceTarget] = useState(0);
  const [priceTargetErrorNotification, setPriceTargetErrorNotification] =
    useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPriceTarget(e.target.value);
  };

  useEffect(() => {
    setPriceTarget(selectedCoin?.priceTarget);
  }, [editMode, selectedCoin?.priceTarget]);

  const handleSave = (e) => {
    e.preventDefault();
    if (priceTarget <= 0 || isNaN(priceTarget)) {
      setPriceTargetErrorNotification("Price target can't be 0");
      return;
    } else {
      if (editMode) {
        const updatedWatchedCoins = watchedCoins.map((coin) =>
          coin.id === selectedCoin.id ? { ...selectedCoin, priceTarget } : coin
        );
        dispatch(coinsActions.saveEdition(updatedWatchedCoins));
      } else {
        const newWatchedCoin = {
          id: selectedCoin.id,
          priceTarget: parseFloat(priceTarget),
        };
        const appendedWatchedCoins = [...watchedCoins, newWatchedCoin];
        dispatch(coinsActions.addToWatchedList(appendedWatchedCoins));
        navigate("/watched-coins");
      }
    }
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <div className="price-target-form">
      <form
        // style={{ flexDirection: !editMode ? "row" : "column" }}
        onSubmit={handleSave}
      >
        <input
          maxLength="12"
          onInput={maxLengthCheck}
          type="number"
          value={priceTarget || ""}
          onChange={handleChange}
          className="target-input"
        />

        {type === "selected" && !editMode && (
          <button type="submit" className="btn ml">
            Watch
          </button>
        )}
        {editMode && (
          <div>
            <button type="submit" className="btn btn-save mt ml">
              Save
            </button>
            <button
              className="btn btn-discard ml"
              onClick={() => dispatch(coinsActions.discardEdition())}
            >
              Discard
            </button>
          </div>
        )}
      </form>
      {priceTargetErrorNotification && (
        <p className="notification">{priceTargetErrorNotification}</p>
      )}
    </div>
  );
}

export default PriceTargetForm;
