import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // Fetch stocks
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(setStocks);
  }, []);

  // Buy a stock
  function handleBuy(stock) {
    if (!portfolio.includes(stock)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  // Sell a stock
  function handleSell(stock) {
    setPortfolio(portfolio.filter((item) => item.id !== stock.id));
  }

  // Filter stocks
  const filteredStocks = filterBy
    ? stocks.filter((stock) => stock.type === filterBy)
    : stocks;

  // Sort stocks
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === "Alphabetically") return a.name.localeCompare(b.name);
    if (sortBy === "Price") return a.price - b.price;
    return 0;
  });

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        filterBy={filterBy}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={sortedStocks} onStockClick={handleBuy} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onStockClick={handleSell} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
