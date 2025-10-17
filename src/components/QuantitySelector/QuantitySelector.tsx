import { Box, ActionIcon, Text } from '@mantine/core';
import styles from './QuantitySelector.module.scss';

type QuantitySelectorProps = {
  value: number;
  onChange: (newValue: number) => void;
  width?: number;
  height?: number;
};

export default function QuantitySelector({
  value,
  onChange,
  width = 90,
  height = 30,
}: QuantitySelectorProps) {
  const buttonSize = height;
  const textWidth = width - buttonSize * 2;

  return (
    <Box
      className={styles.container}
      style={{ width, height }}
    >
      <ActionIcon
        className={styles.button}
        style={{
          width: buttonSize,
          height: buttonSize,
          minWidth: buttonSize,
        }}
        onClick={() => onChange(Math.max(value - 1, 0))}
        disabled={value <= 0}
      >
        -
      </ActionIcon>

      <Text
        className={styles.value}
        style={{
          width: textWidth,
          lineHeight: `${height}px`,
        }}
      >
        {value}
      </Text>

      <ActionIcon
        className={styles.button}
        style={{
          width: buttonSize,
          height: buttonSize,
          minWidth: buttonSize,
        }}
        onClick={() => onChange(value + 1)}
      >
        +
      </ActionIcon>
    </Box>
  );
}