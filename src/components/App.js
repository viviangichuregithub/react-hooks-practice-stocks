import React, { useState, useEffect } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  // Fetch stocks from the server
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then(setStocks);
  }, []);

  // Add stock to portfolio
  function handleBuyStock(stock) {
    if (!portfolio.find((s) => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  // Remove stock from portfolio
  function handleSellStock(stock) {
    const updatedPortfolio = portfolio.filter((s) => s.id !== stock.id);
    setPortfolio(updatedPortfolio);
  }

  return (
    <div>
      <Header />
      <MainContainer
        stocks={stocks}
        portfolio={portfolio}
        onBuyStock={handleBuyStock}
        onSellStock={handleSellStock}
      />
    </div>
  );
}

export default App;
