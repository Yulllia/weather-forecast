
import { Card } from "../../interfaces/interface";
import "./TripCard.css";
import Moment from "react-moment";
import { SetterOrUpdater } from "recoil";

function TripCard(props: {
  cardItem: Card;
  selectedCard: Card | undefined;
  setSelectedCard: SetterOrUpdater<Card>;
}) {
  const { cardItem, setSelectedCard, selectedCard } = props;
  const isSelected = selectedCard?._id === cardItem._id;

  return (
    <>
      <li className="card-item">
        <div
          className={`card ${isSelected ? "selected" : ""}`}
          onClick={() => setSelectedCard(cardItem)}
        >
          <img className="card-image" src={cardItem.image} alt="trips" />
          <div className="card-content">
            <div className="card-title">{cardItem.city}</div>
            <p className="card-text">
              <Moment format="DD.MM.YYYY">{cardItem.startDate}</Moment> -{" "}
              <Moment format="DD.MM.YYYY">{cardItem.endDate}</Moment>
            </p>
          </div>
        </div>
      </li>
    </>
  );
}

export default TripCard;
