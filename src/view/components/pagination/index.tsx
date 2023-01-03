/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './styles.scss';

import React, { useEffect, useState } from 'react';

import { DOTS, usePagination } from '../../hooks/usePagination';
import styles from './styles.scss';

interface PaginationProps {
  onPageChange: any;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const [goToPage, setGoToPage] = useState<number>(currentPage);
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  const paginationRange: any = usePagination(currentPage, totalCount, siblingCount, pageSize);
  console.log(paginationRange, 'paginationRangepaginationRange');

  useEffect(() => {
    if (isFirstLoad) {
      if (goToPage > 0 && goToPage <= Math.ceil(totalCount / pageSize)) {
        onPageChange(goToPage);
      } else {
        setGoToPage(1);
        onPageChange(1);
      }
    }
    setIsFirstLoad(true);
  }, [goToPage]);

  return (
    <div className={styles['pagination-wrapper']}>
      <ul className={styles['pagination-container']}>
        {paginationRange.map((pageNumber: any, index: number) => {
          if (pageNumber === DOTS) {
            return (
              <li className={styles['pagination-item dots']} key={index}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={index}
              className={styles['pagination-item']}
              style={{ color: pageNumber === currentPage ? '#F2715C' : '#919090' }}
              onClick={() => {
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
