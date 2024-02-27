import { useEffect, useState } from "react";
import "./TodayForecast.css";
import { WeatherI } from "../../interfaces/interface";
import { getDaysOfWeek, importSVG } from "../../utils/utils";
import { useRecoilValue } from "recoil";
import { selectedCardState } from "../../state/AtomSelectedCard";
import Timer from "../timer/Timer";

function TodayForecast() {
  const selectedCard = useRecoilValue(selectedCardState);
  const [foreCastDay, setForeCastDay] = useState<WeatherI>();
  const [icon, setIcon] = useState(null);
  const weekDay = foreCastDay && getDaysOfWeek(foreCastDay.datetime);
  const temperature = Math.floor(foreCastDay?.temp ?? 0);

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
    <div className="forecast-container">
      <div className="cloud x1"/>
      <div className="cloud x2"/>
      <div className="cloud x3"/>
      <div className="cloud x4"/>
        <h4 className="today-title">{weekDay}</h4>
        <p className="today-temperature">
          {icon && (
            <img src={icon} alt={foreCastDay?.icon} width={50} height={60} />
          )}{" "}
          <span>{temperature}<span className="celcium">&deg;C</span></span>
        </p>
        <p className="selected-city">{selectedCard.city}</p>
        <Timer startDate={selectedCard.startDate}/>
    </div>
  );
}

export default TodayForecast;
