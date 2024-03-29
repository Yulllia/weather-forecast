import { useEffect, useState } from "react";
import "./Timer.css";

export default function Timer(props: { startDate: string }) {
  const { startDate } = props;
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const getTime = (startDate: string) => {
    const time = Date.parse(startDate) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(startDate), 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="timer" role="timer">
      <div className="col-4">
        <div className="box">
          <p id="day" data-testid="day">
            {days < 10 ? "0" + days : days}
          </p>
          <span className="text-date">Days</span>
        </div>
      </div>
      <div className="col-4">
        <div className="box">
          <p id="hour" data-testid="hour">
            {hours < 10 ? "0" + hours : hours}
          </p>
          <span className="text-date">Hours</span>
        </div>
      </div>
      <div className="col-4">
        <div className="box">
          <p id="minute" data-testid="minute">
            {minutes < 10 ? "0" + minutes : minutes}
          </p>
          <span className="text-date">Minutes</span>
        </div>
      </div>
      <div className="col-4">
        <div className="box">
          <p id="second" data-testid="second">
            {seconds < 10 ? "0" + seconds : seconds}
          </p>
          <span className="text-date">Seconds</span>
        </div>
      </div>
    </div>
  );
}
