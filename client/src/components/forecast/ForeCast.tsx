import { useEffect, useState } from "react";
import "./ForeCast.css";
import { Card, WeatherI } from "../../interfaces/interface";
import ForeCastCard from "../foreCastCard/ForeCastCard";
import axios from "axios";

function ForeCast(props: { selectedCard: Card }) {
  const { selectedCard } = props;
  const [foreCast, setForeCast] = useState<WeatherI[]>([]);

  const formatDate = (date: string) => {
    return date?.split("T")[0];
  };
  const startDate = formatDate(selectedCard?.startDate);
  const endDate = formatDate(selectedCard?.endDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_WEATHER_LINK}/${selectedCard?.city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${process.env.REACT_APP_WEATHER_API}&contentType=json`
        )
        .then((response) => {
          setForeCast(response.data.days);
        })
        .catch((error) => {
          console.error(error);
        });
    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    endDate,
    selectedCard?.city,
    selectedCard.endDate,
    selectedCard.startDate,
    startDate,
  ]);

  return (
    <div data-testid="week-forecast">
      {selectedCard.city && <h3 className="weather-duration">Weak</h3>}
      <div className="weather-list-container">
        <ul className="weather-list">
          {foreCast.map((day: WeatherI, index) => {
            return <ForeCastCard day={day} key={index} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default ForeCast;
