import { describe, it, expect, vi } from 'vitest';
import { render, screen} from "@testing-library/react";
import { MantineProvider } from '@mantine/core';

import { Provider } from 'react-redux';
import Main from './Main';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const mockStore = {
  getState: () => ({
    products: {
      productList: [],
      isLoading: false,
      error: null
    }
  }),
  subscribe: vi.fn(),
  dispatch: vi.fn(),
};

vi.mock('../../hooks/redux', () => ({
  useTypedSelector: (selector: any) => selector(mockStore.getState()),
  useTypedDispatch: () => mockStore.dispatch,
}));

vi.mock('../../store/reducers/ProductThunks', () => ({
  fetchProducts: vi.fn(() => ({ type: 'TEST_ACTION' })),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Main', () => {
  const renderWithProviders = (ui: React.ReactNode, initialState = {}) => {
    mockStore.getState = () => ({
      products: {
        productList: [],
        isLoading: false,
        error: null,
        ...initialState
      }
    });

    return render(
      <Provider store={mockStore as any}>
        <MantineProvider>{ui}</MantineProvider>
      </Provider>
    );
  };

  it('Показывает скелетоны, когда идет загрузка', () => {
    renderWithProviders(<Main />, { isLoading: true });

    const skeletons = document.getElementsByClassName('mantine-Skeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('Рендерит все товары из каталога после загрузки', () => {
    const mockProductList = [
      { id: '1', name: 'Tomato', image: 'tomato.jpg', price: 100, category: 'Vegetable' },
      { id: '2', name: 'Cucumber', image: 'cucumber.jpg', price: 50, category: 'Vegetable' },
    ];
    
    renderWithProviders(<Main />, { 
      productList: mockProductList, 
      isLoading: false 
    });

    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText('Cucumber')).toBeInTheDocument();
  });

  it('Добавляет товар в корзину при клике на Add to Cart', async () => {
    const user = userEvent.setup();
    const mockProductList = [
      { id: '1', name: 'Tomato', image: 'tomato.jpg', price: 100, category: 'Vegetable' }
    ];

    renderWithProviders(<Main />, {
      productList: mockProductList,
      isLoading: false
    });

    const addButton = await screen.findByRole('button', { name: /add to cart/i });
    await user.click(addButton);

    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});