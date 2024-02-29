import { useMemo, useState } from "react";
import CustomSelect from "../customSelect/CustomSelect";
import "./Modal.css";
import { City } from "../../interfaces/interface";
import { useSetRecoilState } from "recoil";
import { addTripState } from "../../state/AtomAdd";
import axios from "axios";

function Modal(props: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setModalVisible } = props;
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [selectedValue, setSelectedValue] = useState<City | string>(
    "Please select a city"
  );
  const googleId = localStorage.getItem("googleId");
  const setTripSaved = useSetRecoilState(addTripState);
  const [today, maxDateString] = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15);
    const maxDateString = maxDate.toISOString().slice(0, 10);
    return [today, maxDateString];
  }, []);

  const saveTrip = async () => {
    if (!startDate || !endDate || typeof selectedValue === "string") {
      return;
    }

    const trip = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      city: typeof selectedValue === "object" && selectedValue.city,
      image: typeof selectedValue === "object" && selectedValue.image,
      googleId
    };

    try {
      await axios.post(`${process.env.REACT_APP_API}/addTrip`, trip, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      closeModal();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    closeModal();
  };
  const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div data-testid="modal" className="modal" onClick={handleOutsideClick}>
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className="modal-header">
          <h3>Create trip</h3>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </header>
        <div className="divider" />
        <form className="form-container">
          <div className="block-input">
            <label className="label" htmlFor="city">
              <span>*</span> City
            </label>
            <CustomSelect
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </div>
          <div className="block-input">
            <label className="label" htmlFor="startDate">
              <span>*</span> Start date
            </label>
            <input
              type="date"
              id="startDate"
              onChange={onChangeStartDate}
              name="startDate"
              data-testid="start-date"
              className="flatpickr-input"
              defaultValue={startDate}
              min={today}
              max={maxDateString}
            ></input>
          </div>
          <div className="block-input">
            <label className="label" htmlFor="endDate">
              <span>*</span> End date
            </label>
            <input
              type="date"
              placeholder="Select date"
              data-testid="end-date"
              id="endDate"
              name="endDate"
              className="flatpickr-input"
              onChange={onChangeEndDate}
              defaultValue={endDate}
              min={today}
              max={maxDateString}
            ></input>
          </div>
        </form>
        <div className="divider" />
        <div className="button-container">
          <button onClick={closeModal} className="button cancel">
            Cancel
          </button>
          <button
            disabled={
              !startDate || !endDate || typeof selectedValue === "string"
            }
            className="button save"
            data-testid="save-button"
            onClick={saveTrip}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
