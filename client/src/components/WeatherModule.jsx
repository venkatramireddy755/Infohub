
import { useEffect, useState } from "react";
import axios from "axios";

const WeatherModule = () => {
  const [city, setCity] = useState("Bengaluru");
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`/api/weather?city=${city}`);
   

      setData(res.data);
    } catch (err) {
      setError("Could not fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🌤 Weather Info</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={fetchWeather}
      style={{
    backgroundColor: "#b2e348dd",
    color: "black",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  }}>Check Weather</button>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && !isLoading && !error && (
        <div style={{ marginTop: "10px" }}>
          <h3>{data.city}</h3>
          <p>🌡 Temperature: {data.temperature} °C</p>
          <p>🌀 Condition: {data.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherModule;
