import React from 'react';
import { render, fireEvent,  screen } from '@testing-library/react';
import AddTrip from './AddTrip';
import { RecoilRoot } from 'recoil';

describe('AddTrip component', () => {
  test('should open modal when clicked', () => {
    render(<RecoilRoot><AddTrip /></RecoilRoot>);

    fireEvent.click(screen.getByText('Add Trip'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  test('should close modal when setModalVisible is called with false', () => {
     render( <RecoilRoot><AddTrip /></RecoilRoot>);

    fireEvent.click(screen.getByText('Add Trip'));

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByTestId('modal')).toBeNull();
  });
});