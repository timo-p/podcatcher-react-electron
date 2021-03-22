import { Box } from '@material-ui/core';
import React from 'react';
import styles from './Section.module.css';

type SectionType = {
  children: React.ReactNode;
};

export default function Section({ children }: SectionType) {
  return <Box className={styles.section}>{children}</Box>;
}
