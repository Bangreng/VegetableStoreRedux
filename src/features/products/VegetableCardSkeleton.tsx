import { Box, Skeleton } from '@mantine/core';
import styles from './VegetableCardSkeleton.module.scss';

export default function VegetableCardSkeleton() {
  return (
    <Box component="div" className={styles.skeletonCard}>
      <Box className={styles.imageWrapper}>
        <Skeleton height="100%" width="100%" radius="md" />
        <Box className={styles.svgOverlay}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="2.44444" height="19.5556" rx="1.22222" fill="#CED4DA" />
            <rect x="4.88892" y="6.51849" width="2.44444" height="6.51852" rx="1.22222" fill="#CED4DA" />
            <rect x="9.77783" y="3.25928" width="2.44444" height="13.037" rx="1.22222" fill="#CED4DA" />
            <rect x="14.6666" y="6.51849" width="2.44444" height="6.51852" rx="1.22222" fill="#CED4DA" />
            <rect x="19.5555" width="2.44444" height="19.5556" rx="1.22222" fill="#CED4DA" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}
