import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import type { RootState } from "../store/index";
import { coinsActions } from "../store/coins";
import { layoutActions } from "../store/layout";

function ActionsModal() {
  const dispatch = useAppDispatch();
  const { watchedCoins, selectedCoin } = useAppSelector(
    (state: RootState) => state.coins
  );

  const closeModalHandler = () => {
    dispatch(layoutActions.closeModal());
  };

  const handleEditClick = () => {
    dispatch(coinsActions.openEditMode(selectedCoin!.priceTarget!));
  };

  const handleDeleteClick = () => {
    const newWatchedCoins = watchedCoins!.filter(
      (coin) => coin.id !== selectedCoin!.id
    );
    dispatch(coinsActions.deleteCoin(newWatchedCoins));
  };

  return (
    <div className="modal">
      <div className="modal-wrapper" onClick={closeModalHandler}>
        <div className="action-button-box">
          <button className="btn btn-full-width" onClick={handleEditClick}>
            Edit
          </button>
          <button
            className="btn btn-delete btn-full-width"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionsModal;
