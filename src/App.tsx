import '@mantine/core/styles.css';
import './App.css';
import { MantineProvider } from '@mantine/core';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
// import { CartProvider } from './features/cart/CartContext';
import { Provider } from 'react-redux';
import {setupStore} from './store/store'

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Header />
        <Main />
      </MantineProvider>
    </Provider>
  );
}

export default App;
