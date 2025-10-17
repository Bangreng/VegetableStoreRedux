import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import CartPopup from './CartPopup';
import '@testing-library/jest-dom';
import type { Product } from '../../types/Product';
import type { CartItem } from '../../store/reducers/ProductSlice';



vi.mock('../../store/reducers/ProductSlice', () => ({
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
}));

const mockStore = {
  getState: () => ({
    products: {
      productList: [] as Product[],
      isLoading: false,
      error: '',
      cart: [] as CartItem[]
    }
  }),
  subscribe: vi.fn(),
  dispatch: vi.fn(),
};

vi.mock('../../hooks/redux', () => ({
  useTypedSelector: (selector: any) => selector(mockStore.getState()),
  useTypedDispatch: () => mockStore.dispatch,
}));

const { addToCart, removeFromCart } = await import('../../store/reducers/ProductSlice');

const mockAddToCart = addToCart as any;
const mockRemoveFromCart = removeFromCart as any;

describe('CartPopup', () => {
  const mockCart: CartItem[] = [
    { 
      id: '1', 
      name: 'Tomato', 
      price: 100, 
      category: 'Vegetable', 
      image: 'tomato.jpg', 
      quantity: 2 
    },
    { 
      id: '2', 
      name: 'Cucumber', 
      price: 50, 
      category: 'Vegetable', 
      image: 'cucumber.jpg', 
      quantity: 1 
    },
  ];

  const renderCartPopup = (visible = true, cart = mockCart) => {
    mockStore.getState = () => ({
      products: {
        productList: [],
        isLoading: false,
        error: '',
        cart: cart
      }
    });

    return render(
      <Provider store={mockStore as any}>
        <MantineProvider>
          <CartPopup visible={visible} />
        </MantineProvider>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Рендерит popup с товарами', () => {
    renderCartPopup();
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText('Cucumber')).toBeInTheDocument();
    expect(screen.getByText('$250.00')).toBeInTheDocument();
  });

  it('Удаляет товар из корзины при установке количества в 0 через QuantitySelector', async () => {
    const user = userEvent.setup();
    
    let quantity = 2;
    mockAddToCart.mockImplementation((payload: any) => {
      const { product, quantity: delta } = payload;
      quantity += delta;
      if (quantity <= 0) {
        mockRemoveFromCart(product.id);
      }
    });

    renderCartPopup();

    const decrementButtons = screen.getAllByRole('button', { name: '-' });

    await user.click(decrementButtons[0]);
    await user.click(decrementButtons[0]);

    await waitFor(() => {
      expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
      expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
    });
  });

  it('Обновляет количество товара при изменении через + и -', async () => {
    const user = userEvent.setup();
    renderCartPopup();

    const decrementButtons = screen.getAllByRole('button', { name: '-' });
    const incrementButtons = screen.getAllByRole('button', { name: '+' });

    await user.click(decrementButtons[0]);

    expect(mockAddToCart).toHaveBeenCalledWith({
      product: expect.objectContaining({ id: '1' }),
      quantity: -1
    });

    await user.click(incrementButtons[1]);

    expect(mockAddToCart).toHaveBeenCalledWith({
      product: expect.objectContaining({ id: '2' }),
      quantity: 1
    });
  });
});