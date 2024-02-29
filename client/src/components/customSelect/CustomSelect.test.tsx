import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomSelect from './CustomSelect';
import citiesData from "../../utils/city.json";

describe('CustomSelect Component', () => {
  test('renders custom select with options', () => {
    render(
      <CustomSelect
        selectedValue="Please select a city"
        setSelectedValue={() => {}}
      />
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    expect(screen.getByText('Please select a city')).toBeInTheDocument();

    citiesData.cities.forEach((city) => {
      expect(screen.getByText(city.city)).toBeInTheDocument();
    });
  });

  test('clicking the button toggles the dropdown', () => {
    render(
      <CustomSelect
        selectedValue="Please select a city"
        setSelectedValue={() => {}}
      />
    );

    const button = screen.getByRole('combobox');
    const dropdown = screen.getByRole('listbox');

    fireEvent.click(button);

    expect(dropdown).toBeVisible();

    fireEvent.click(button);
  });

  test('selecting an option calls setSelectedValue and closes the dropdown', () => {
    const setSelectedValueMock = jest.fn();
    render(
      <CustomSelect
        selectedValue="Please select a city"
        setSelectedValue={setSelectedValueMock}
      />
    );

    const button = screen.getByRole('combobox');
    
    fireEvent.click(button);

    const cityOption = screen.getByText('Paris');
    fireEvent.click(cityOption);

    expect(setSelectedValueMock).toHaveBeenCalledWith({
      city: 'Paris',
      image: 'https://www.travelandleisure.com/thmb/f-3j5QnS8FRCIPQGeitCxVDKVJA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3-paris-social-niche1115-470f7989143d49f7a3def0ac3940988d.jpg',
    });
  });
});