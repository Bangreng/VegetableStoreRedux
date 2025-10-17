
import { describe, it, expect } from 'vitest';
import Header from './Header';
import { fireEvent, screen, render } from "@testing-library/react";
import { MantineProvider } from '@mantine/core';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

const store = setupStore();

describe('Header', () => {
  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <Provider store={store}>
        <MantineProvider>{ui}</MantineProvider>
      </Provider>
    );
  };

  it('отображает кнопку Cart', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  });

  it('Открывается popup при клике на кнопку Cart', () => {
    renderWithProviders(<Header />);

    const cartButton = screen.getByRole('button', { name: /Cart/i });
    expect(cartButton).toBeInTheDocument();

    fireEvent.click(cartButton);
    expect(screen.getByText(/Your cart is empty!/i)).toBeInTheDocument();
  });

  it('Закрывается popup при повторном клике на кнопку Cart', () => {
    renderWithProviders(<Header />);

    const cartBtn = screen.getByRole('button', { name: /Cart/i });
    expect(cartBtn).toBeInTheDocument();

    fireEvent.click(cartBtn);
    expect(screen.getByText(/Your cart is empty!/i)).toBeInTheDocument();

    fireEvent.click(cartBtn);
    expect(screen.queryByText(/Your cart is empty!/i)).not.toBeInTheDocument();
  });
});