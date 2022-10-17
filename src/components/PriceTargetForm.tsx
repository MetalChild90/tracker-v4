import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { coinsActions } from "../store/coins";
import { WatchedCoinsInterface } from "../Interfaces";

interface CoinRowProps {
  type?: string;
}

function PriceTargetForm({ type }: CoinRowProps) {
  const dispatch = useAppDispatch();
  const { editMode, watchedCoins, selectedCoin } = useAppSelector(
    (state: RootState) => state.coins
  );

  const [priceTarget, setPriceTarget] = useState<string>("");
  const [priceTargetErrorNotification, setPriceTargetErrorNotification] =
    useState("");

  const navigate = useNavigate();

  let typedValue = "";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceTarget(e.target.value);
    typedValue += e.target.value.trim().toString();
    if (!typedValue.includes(".")) {
      let result = typedValue.replace(/^(?:0+(?=[1-9])|0+(?=0$))/gm, "");
      setPriceTarget(result);
    } else {
      let parts = typedValue.split(".");
      let partOne = parts[0].replace(/^(?:0+(?=[1-9])|0+(?=0$))/gm, "");
      let completeNumber = partOne + "." + parts[1];
      setPriceTarget(completeNumber);
    }
  };

  useEffect(() => {
    const target = String(selectedCoin?.priceTarget!);
    setPriceTarget(target);
  }, [editMode, selectedCoin?.priceTarget]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = parseFloat(priceTarget);
    if (target! <= 0 || isNaN(target!)) {
      setPriceTargetErrorNotification("Price target can't be 0");
      return;
    } else {
      if (editMode) {
        const updatedWatchedCoins: WatchedCoinsInterface[] = watchedCoins!.map(
          (coin) =>
            coin.id === selectedCoin!.id
              ? { ...selectedCoin, priceTarget: target }
              : coin
        );
        dispatch(coinsActions.saveEdition(updatedWatchedCoins));
      } else {
        const newWatchedCoin = {
          id: selectedCoin!.id,
          priceTarget: target,
        };
        const appendedWatchedCoins = watchedCoins?.concat(newWatchedCoin);
        dispatch(coinsActions.addToWatchedList(appendedWatchedCoins));
        navigate("/watched-coins");
      }
    }
  };

  const maxLengthCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const obj = e.target;
    if (obj.value.length > obj.maxLength) {
      obj.value = obj.value.slice(0, obj.maxLength);
    }
  };

  return (
    <div className="price-target-form">
      <form onSubmit={handleSave}>
        <input
          maxLength={12}
          onInput={maxLengthCheck}
          type="number"
          value={priceTarget || ""}
          onChange={handleChange}
          className="target-input"
        />

        {type === "selected" && !editMode && (
          <button type="submit" className="btn">
            Watch
          </button>
        )}
        {editMode && (
          <div>
            <button type="submit" className="btn btn-save">
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
