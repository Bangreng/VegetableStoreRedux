
import { Box, Text } from '@mantine/core';
import VegetableCard from '../../features/products/VegetableCard';
import VegetableCardSkeleton from '../../features/products/VegetableCardSkeleton';
import styles from './Main.module.scss';

import { useTypedSelector, useTypedDispatch } from '../../hooks/redux';
import { fetchProducts } from './../../store/reducers/ProductThunks'
import { useEffect } from 'react';

export default function Main() {

  const {productList, isLoading, error} = useTypedSelector(state => state.products)
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <Box component="main" className={styles.main}>
      <Text component="h2" className={styles.title}>
        Catalog
      </Text>

      {error && <Text c="red">{error}</Text>}

      <Box component="div" className={styles.catalog}>
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <VegetableCardSkeleton key={index} />
            ))
          : productList.map(({ id, name, image, price, category }) => (
              <VegetableCard
                key={id}
                id={id}
                name={name}
                image={image}
                price={price}
                category={category}
              />
            ))}
      </Box>
    </Box>
  );
}