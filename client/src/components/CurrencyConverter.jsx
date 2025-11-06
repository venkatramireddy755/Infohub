import { useEffect, useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convertCurrency = () => {
    setLoading(true);
    axios.get(`/api/currency?amount=${amount}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Currency conversion failed.");
        setLoading(false);
      });
  };

  useEffect(() => {
    convertCurrency();
  }, []);

  return (
    <div>
      <h2>Currency Converter (INR → USD / EUR)</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button
        onClick={convertCurrency}
        style={{
        backgroundColor: "#b2e348dd",
        color: "black",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    }}
>
  Convert
</button>


      {isLoading && <p>Converting...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <p>💵 {data.amount} INR = {data.usd} USD</p>
          <p>💶 {data.amount} INR = {data.eur} EUR</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
