import { useEffect, useState } from "react";
import "./TodayForecast.css";
import { WeatherI } from "../../interfaces/interface";
import { getDaysOfWeek, importSVG } from "../../utils/utils";
import { useRecoilValue } from "recoil";
import { selectedCardState } from "../../state/AtomSelectedCard";

function TodayForecast() {
  const selectedCard = useRecoilValue(selectedCardState);
  const [foreCastDay, setForeCastDay] = useState<WeatherI>();
  const [icon, setIcon] = useState(null);
  const weekDay = foreCastDay && getDaysOfWeek(foreCastDay.datetime);

  useEffect(() => {
    const loadIcon = async () => {
      if (foreCastDay && foreCastDay.icon) {
        const iconData = await importSVG(foreCastDay.icon);
        setIcon(iconData);
      }
    };

    loadIcon();
  }, [foreCastDay]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEATHER_LINK}/${selectedCard.city}/today?unitGroup=metric&include=days&key=${process.env.REACT_APP_WEATHER_API}&contentType=json`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const weatherDay = await response.json();
        setForeCastDay(weatherDay.days[0]);
        console.log(weatherDay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCard.city]);

  return (
    <div>
      <h4>{weekDay}</h4>
      <p>
        {icon && (
          <img src={icon} alt={foreCastDay?.icon} width={50} height={50} />
        )}{" "}
        <span>{foreCastDay?.temp}°</span>
      </p>
      <p>{selectedCard.city}</p>
    </div>
  );
}

export default TodayForecast;
