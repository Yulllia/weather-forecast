import { MouseEvent, useState } from "react";
import "./CustomSelect.css";
import citiesData from "../../utils/city.json";
import { City } from "../../interfaces/interface";

function CustomSelect(props: { selectedValue: City | string; setSelectedValue: React.Dispatch<React.SetStateAction<City |string>>; }) {
    const { selectedValue, setSelectedValue } =props;
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleOptionClick = (value: City) => {
    setSelectedValue(value);
    setIsActive(false);
  };
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  return (
    <div
      className={`custom-select ${isActive ? "active" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="select-button"
        role="combobox"
        aria-labelledby="select-button"
        aria-haspopup="listbox"
        aria-expanded={isActive}
        aria-controls="select-dropdown"
        onClick={handleButtonClick}
      >
        <span className="selected-value">
          {typeof selectedValue === "string"
            ? selectedValue
            : selectedValue.city}
        </span>
        <span className="arrow"></span>
      </button>
      <ul className="select-dropdown" role="listbox" id="select-dropdown">
        {citiesData.cities.map((city) => (
          <li
            key={city.city}
            role="option"
            aria-selected={selectedValue === city.city ? "true" : "false"}
            onClick={() => handleOptionClick(city)}
          >
            <input type="radio" id={city.city} name="city" />
            <label htmlFor={city.city}>
              <img src={city.image} alt={city.city} width={65} height={45} />
              {city.city}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
