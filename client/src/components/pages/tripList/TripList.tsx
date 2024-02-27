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

function TripList() {
  const cardWidth = 150;

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
  const setTripSaved = useSetRecoilState(addTripState);

  useEffect(() => {
    const container = containerRef.current;

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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/trips`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setList(data);
        setTripSaved(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tripSaved]);

  useEffect(() => {
    handleSearch();
  }, [search, list, tripSaved]);

  const scroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleSearch = () => {
    const filtered = list?.filter((trip: Card) =>
      trip.city.toLowerCase().includes(search.toLowerCase())
    );
    setFilterTrips(filtered);
  };

  return (
    <div className={`${selectedCard._id ? "container-app" : ""}`}>
      <div className="list-container">
        <h3>
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
            className={`cards ${selectedCard._id ? "selected-card" : ""}`}
            ref={containerRef}
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
          <div className="add-trip-container">
            <AddTrip />
          </div>
        </div>

        {selectedCard._id && <ForeCast selectedCard={selectedCard} />}
      </div>
      {selectedCard._id && <TodayForecast /> }
    </div>
  );
}

export default TripList;
