import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import Timer from './Timer';

jest.mock("axios");

describe('Timer', () => {
  const advanceTimersAndUpdate = async (time: number) => {
    act(() => {
      jest.advanceTimersByTime(time);
    });
  };

  test('updates timer correctly after one second', async () => {
    jest.useFakeTimers();

    const startDate = '2024-03-02T00:00:00.000Z';
    render(<Timer startDate={startDate} />);

    // Manually call getTime to initialize the timer values
    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    await advanceTimersAndUpdate(1000);
    const dayTime = Date.parse(startDate) - Date.now();
    const expectedDay = Math.floor(dayTime / (1000 * 60 * 60 * 24))

    await waitFor(() => {
      expect(screen.getByTestId('day')).toHaveTextContent(String(expectedDay));
    });

    jest.useRealTimers();

  });
});