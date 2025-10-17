import { Text, Box, Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';
import CartPopup from '../../features/cart/CartPopup';
import styles from './Header.module.scss';
import { useTypedSelector } from '../../hooks/redux';

export default function Header() {
  const cart = useTypedSelector(state => state.products.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <Box component="header" className={styles.header}>
      <Box className={styles.headerInner}>
        <Box className={styles.logoWrapper}>
          <Text component="a" href="/" className={styles.logo}>
            Vegetable
          </Text>
          <Text component="a" href="/shop" className={styles.shopLink}>
            SHOP
          </Text>
        </Box>

        <Box pos="relative">
          <Button
            className={styles.cartButton}
            onClick={() => setIsPopupOpen((prev) => !prev)}
          >
            <Box className={styles.cartButtonContent}>
              {totalItems > 0 && (
                <Box className={styles.cartBadge}>{totalItems}</Box>
              )}
              <Text fw={600}>Cart</Text>
              <IconShoppingCart size={20} />
            </Box>
          </Button>

          <CartPopup visible={isPopupOpen} />
        </Box>
      </Box>
    </Box>
  );
}