import { useEffect, useState } from "react";
import { WeatherI } from "../../interfaces/interface";
import { getDaysOfWeek, importSVG } from "../../utils/utils";
import "./ForeCastCard.css";

function ForeCastCard(props: { day: WeatherI }) {
  const { day } = props;
  const [icon, setIcon] = useState(null);
  const weekDay = getDaysOfWeek(day.datetime);

  useEffect(() => {
    const loadIcon = async () => {
      const iconData = await importSVG(day.icon);
      setIcon(iconData);
    };

    loadIcon();
  }, [day.icon]);

  return (
    <div className="weather-day" data-testid="forecast-card">
      <p className="weak">{weekDay}</p>
      {icon && <img src={icon} alt={day.icon} width={50} height={50}/>}
      <p className="temperature">{day.tempmax}°/{day.tempmin}°</p>
    </div>
  );
}

export default ForeCastCard;
