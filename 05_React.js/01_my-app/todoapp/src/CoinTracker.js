import { useEffect, useState } from "react";

function CoinTracker() {
  const [loading, setLoaing] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState("");
  const [inverted, setInverted] = useState(false);
  const onChangeInput = (e) => {
    setAmount(e.target.value);
  };
  const onReset = () => {
    setAmount("");
  };
  const onInvert = () => {
    onReset();
    setInverted((inverted) => !inverted);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setLoaing(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins ({loading ? "" : coins.length})</h1>
      <div>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
        )}
      </div>

      <hr />
      <div>
        <label htmlFor="usd">USD</label>
        <input
          onChange={onChangeInput}
          id="usd"
          value={inverted ? (amount / 0.00002338).toFixed(2) : amount}
          type="number"
          placeholder="USD"
          disabled={inverted}
        />
      </div>
      <div>
        <label htmlFor="btc">BTC</label>
        <input
          onChange={onChangeInput}
          id="btc"
          value={inverted ? amount : amount * 0.00002338}
          type="number"
          placeholder="BTC"
          disabled={!inverted}
        />
      </div>
      <button onClick={onReset}>Reset</button>
      <button onClick={onInvert}>Invert</button>
    </div>
  );
}
export default CoinTracker;
