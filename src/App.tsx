import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { coinsActions } from "./store/coins";
import { useDispatch } from "react-redux";
import { getAllCoins } from "./AppActions";
import { useEffect } from "react";
import Coins from "./pages/Coins";
import WatchedCoins from "./pages/WatchedCoins";
import SelectedCoin from "./pages/SelectedCoin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCoins = async () => {
      dispatch(coinsActions.setLoading());
      const allCoinsNames = await getAllCoins();
      dispatch(coinsActions.getAllCoins(allCoinsNames));
    };
    fetchAllCoins();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="box-beneath-header"></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/selected-coin/:id" element={<SelectedCoin />} />
            <Route path="/watched-coins" element={<WatchedCoins />} />
            <Route path="/coins" element={<Coins />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
