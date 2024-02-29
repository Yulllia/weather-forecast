import { useEffect, useRef, useState } from "react";
import "./TripList.css";
import { Card } from "../../../interfaces/interface";
import TripCard from "../../tripCard/TripCard";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { addTripState } from "../../../state/AtomAdd";
import AddTrip from "../../addTrip/AddTrip";
import Search from "../../search/Search";
import { searchState } from "../../../state/AtomSearch";
import ForeCast from "../../forecast/ForeCast";
import TodayForecast from "../../todayForecast/TodayForecast";
import { selectedCardState } from "../../../state/AtomSelectedCard";
import { compareDates } from "../../../utils/utils";
import Spinner from "../../spinner/Spinner";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function TripList() {
  const cardWidth = 200;

  const [list, setList] = useState<Card[]>([]);
  const [filterTrips, setFilterTrips] = useState<Card[]>(list);
  const tripSaved = useRecoilValue(addTripState);
  const search = useRecoilValue(searchState);
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [scrollState, setScrollState] = useState({
    isPrevEnabled: false,
    isNextEnabled: false,
  });
  const [selectedCard, setSelectedCard] = useRecoilState<Card>(
    selectedCardState
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const googleId =
    searchParams.get("googleId") || localStorage.getItem("googleId");
  const setTripSaved = useSetRecoilState(addTripState);
  const container = containerRef.current;

  useEffect(() => {
    if (container) {
      const handleScroll = () => {
        setScrollState({
          isPrevEnabled: container.scrollLeft > 0,
          isNextEnabled:
            container.scrollLeft !==
            container.scrollWidth - container.clientWidth,
        });
      };
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [container]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API}/trips?googleId=${googleId}`)
          .then((response) => {
            setList(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        setTripSaved(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [googleId, setTripSaved, tripSaved]);

  const handleSearch = () => {
    const filtered = list?.filter((trip: Card) =>
      trip.city.toLowerCase().includes(search.toLowerCase())
    );
    const sortedData = filtered
      .slice()
      .sort((a, b) => compareDates(a.startDate, b.startDate));
    setFilterTrips(sortedData);
  };

  useEffect(() => {
    handleSearch();
  }, [search, list, tripSaved]);

  if (loading) {
    return <Spinner />;
  }

  const scroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`${selectedCard._id ? "container-app" : ""}`}>
      <div className="list-container">
        <h3 data-testid="weather">
          Weather <b>Forecast</b>
        </h3>
        <Search handleSearch={handleSearch} />
        <div className="scroll-buttons">
          <button
            disabled={!scrollState.isPrevEnabled}
            className="btn-arrow btn-arrow-left"
            onClick={() => scroll(-cardWidth * 3)}
          >
            Previous
          </button>
          <button
            disabled={!scrollState.isNextEnabled}
            className="btn-arrow btn-arrow-right"
            onClick={() => scroll(cardWidth * 3)}
          >
            Next
          </button>
        </div>
        <div className="cards-container">
          <ul
            className={`cards ${selectedCard._id ? "selected-card" : ""} ${
              filterTrips.length === 1 ? "one-trip-width" : ""
            }`}
            ref={containerRef}
            data-testid="trip-list"
          >
            {filterTrips.map((card: Card) => {
              return (
                <TripCard
                  cardItem={card}
                  selectedCard={selectedCard}
                  key={card._id}
                  setSelectedCard={setSelectedCard}
                />
              );
            })}
          </ul>
          <div className="add-trip-container">{googleId && <AddTrip />}</div>
        </div>
        {selectedCard._id && <ForeCast selectedCard={selectedCard} />}
      </div>
      {selectedCard._id && <TodayForecast />}
    </div>
  );
}

export default TripList;
