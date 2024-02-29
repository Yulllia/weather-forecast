import { useEffect, useState } from "react";
import "./TodayForecast.css";
import { WeatherI } from "../../interfaces/interface";
import { getDaysOfWeek, importSVG } from "../../utils/utils";
import { useRecoilValue } from "recoil";
import { selectedCardState } from "../../state/AtomSelectedCard";
import Timer from "../timer/Timer";
import Spinner from "../spinner/Spinner";
import axios from "axios";

function TodayForecast() {
  const selectedCard = useRecoilValue(selectedCardState);
  const [foreCastDay, setForeCastDay] = useState<WeatherI>();
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    const fetchData = async () => {
      try {
        await axios
          .get(
            `${process.env.REACT_APP_WEATHER_LINK}/${selectedCard.city}/today?unitGroup=metric&include=days&key=${process.env.REACT_APP_WEATHER_API}&contentType=json`
          )
          .then((response) => {
            setForeCastDay(response.data.days[0]);
          })
          .catch((error) => {
            console.error(error);
          });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCard.city]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="forecast-container" data-testid="today-forecast">
      <div className="cloud x1" />
      <div className="cloud x2" />
      <div className="cloud x3" />
      <div className="cloud x4" />
      <h4 className="today-title">{weekDay}</h4>
      <p className="today-temperature">
        {icon && (
          <img src={icon} alt={foreCastDay?.icon} width={50} height={60} />
        )}{" "}
        <span>
          {temperature}
          <span className="celcium">&deg;C</span>
        </span>
      </p>
      <p className="selected-city">{selectedCard.city}</p>
      <Timer startDate={selectedCard.startDate} />
    </div>
  );
}

export default TodayForecast;
