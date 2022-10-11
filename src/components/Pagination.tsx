import { useAppSelector, useAppDispatch } from "../hooks/typescriptHooks";
import { paginationActions } from "../store/pagination";
import type { RootState } from "../store/index";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const allCoins = useAppSelector((state: RootState) => state.coins.allCoins);
  const coinsPerPage = useAppSelector(
    (state: RootState) => state.pagination.coinsPerPage
  );
  const currentPage = useAppSelector(
    (state: RootState) => state.pagination.currentPage
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCoins.length / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  function paginate(pageNumber) {
    dispatch(paginationActions.setCurrentPage(pageNumber));
  }

  return (
    <nav>
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`pagination-list-item ${
              number === currentPage && "activePage"
            }`}
          >
            <span className="pagination-link">{number}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
