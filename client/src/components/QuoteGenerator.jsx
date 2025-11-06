import { useEffect, useState } from "react";
import axios from "axios";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuote = () => {
    setLoading(true);
    axios.get("/api/quote")
      .then((res) => {
        setQuote(res.data.quote);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quote.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (isLoading) return <p>Loading quote...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Motivational Quote 💭</h2>
      <blockquote style={{ fontStyle: "italic", margin: "10px 0" }}>{quote}</blockquote>
      <button onClick={fetchQuote}
      style={{
        backgroundColor: "#b2e348dd",
        color: "black",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    }}>Get New Quote</button>
    </div>
  );
};

export default QuoteGenerator;
