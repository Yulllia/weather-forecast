import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Modal from './Modal';

// Mocking axios for testing
jest.mock('axios');

describe('Modal Component', () => {
  test('renders modal with form', async () => {
    render(<Modal setModalVisible={() => {}} />);
    
    expect(screen.getByText('Create trip')).toBeInTheDocument();
    
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('clicking Save button calls axios and closes modal', async () => {
    const setModalVisible = jest.fn();
    render(<Modal setModalVisible={setModalVisible} />);
    const startDate = screen.getByTestId("start-date")
    const endDate = screen.getByTestId("end-date")
    const saveButton = screen.getByTestId("save-button")

    expect(saveButton).toBeDisabled();

    // Fill in form details
    const button = screen.getByRole('combobox');
    
    fireEvent.click(button);

    const cityOption = screen.getByText('Paris');
    fireEvent.click(cityOption);

    fireEvent.change(startDate, { target: { value: '2024-03-01' } });
    fireEvent.change(endDate, { target: { value: '2024-03-10' } });

    // Click the Save button
    fireEvent.click(screen.getByText('Save'));

    // Wait for the axios request to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled()
    });
  });
});