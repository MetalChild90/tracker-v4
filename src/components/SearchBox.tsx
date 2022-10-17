import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { CoinInterface } from "../Interfaces";
import capitalizeToken from "../helpers/capitalizeToken";
import isTokenWatched from "../helpers/isTokenWatched";

function SearchBox() {
  const { allCoins, watchedCoins } = useAppSelector(
    (state: RootState) => state.coins
  );

  const [typedCoin, setTypedCoin] = useState("");
  const [hints, setHints] = useState<CoinInterface[] | null>([]);
  const [textNotification, setTextNotification] = useState("");

  const navigate = useNavigate();

  const lookForSimilar = (typedName: string) => {
    let foundCoins: CoinInterface[] = allCoins!.filter((coin) =>
      coin!.name!.toLowerCase().startsWith(typedName.toLowerCase()) ? coin : ""
    );
    foundCoins = foundCoins.slice(0, 10);
    setHints(foundCoins);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const typedName = e.target.value.trim();
    setTypedCoin(typedName);
    lookForSimilar(typedName);
    if (e.target.value === "") {
      setHints([]);
    }
  }

  function validateToken(token: string) {
    console.log(token);
    setHints([]);

    const capitalizedToken = capitalizeToken(token);
    setTypedCoin(capitalizeToken);

    const isTokenExist = allCoins!.filter(
      (coin) => coin.name === capitalizedToken
    );
    console.log(isTokenExist);
    const tokenId = isTokenExist[0]?.id;
    console.log(tokenId);

    const isWatched = isTokenWatched(watchedCoins, tokenId!);
    console.log(isWatched);
    if (typedCoin === "") {
      setTextNotification("Please, enter name of the coin");
    } else if (isWatched) {
      setTextNotification(
        "You already have this token in your watchlist, choose another one"
      );
    } else if (isTokenExist.length > 0) {
      console.log("work");
      setTypedCoin("");
      setTextNotification("");
      navigate(`/selected-coin/${tokenId}`);
    } else {
      setTextNotification("Token not found");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      validateToken(typedCoin.trim());
    }
  }

  function handleClose() {
    setTypedCoin("");
    setTextNotification("");
    setHints([]);
  }

  return (
    <div className="search-box">
      <div className="input-wrapper">
        <div>
          <input
            name="name"
            type="text"
            value={typedCoin}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setTextNotification("")}
            className="search-input"
            placeholder="Write correct token name"
          />
          <span onClick={handleClose} className="clear-input">
            &times;
          </span>
        </div>
        <span
          className="btn search-button"
          onClick={() => validateToken(typedCoin.trim())}
        >
          Search
        </span>
        {hints!.length > 0 && (
          <div className="hints-box">
            {hints!.map((hint, i) => (
              <p
                className="hint"
                onClick={() => validateToken(hint.name!)}
                key={i}
              >
                {hint.name}
              </p>
            ))}
          </div>
        )}
      </div>
      {textNotification && (
        <p className="notification">
          <span>{textNotification}</span>
          <span className="closeTextNotification" onClick={handleClose}>
            &times;
          </span>
        </p>
      )}
    </div>
  );
}

export default SearchBox;
