import type { Product } from "../../types/Product";
import { Box, Image, Text, Button } from '@mantine/core';
import { useState } from 'react';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import styles from './VegetableCard.module.scss';

import { useTypedDispatch } from '../../hooks/redux';
import { addToCart } from '../../store/reducers/ProductSlice';

export default function VegetableCard({ id, name, image, price, category }: Product) {
  const [count, setCount] = useState(0);
  const dispatch = useTypedDispatch();

  const handleAdd = () => {
    if(count > 0){
      dispatch(addToCart({ product: { id, name, image, price, category }, quantity: count }));
      setCount(0);
    }
  };

  return (
    <Box component="div" className={styles.card}>
      <Image src={image} alt={name} height={276} width={276} className={styles.image} />

      <Box className={styles.content}>
        <Box className={styles.top}>
          <Box className={styles.titleBox}>
            <Text className={styles.name}>{name.split(' - ')[0]}</Text>
            <Text className={styles.subtitle}>{name.split(' - ')[1]}</Text>
          </Box>
          <QuantitySelector value={count} onChange={setCount} />
        </Box>

        <Box className={styles.bottom}>
          <Text className={styles.price}>${price}</Text>
          <Button className={styles.button} onClick={handleAdd}>
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
