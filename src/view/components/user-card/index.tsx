import React from 'react';

import avatar from '~/view/assets/images/avatar1.png';
import { Card } from '~/view/components/card';
import { Text, TextStyle, TextWeight } from '~/view/components/text';

import styles from './styles.scss';

export const UserCard: React.FC = () => {
  return (
    <Card className={styles['card']}>
      <div className={styles['card__content']}>
        <img src={avatar} className={styles['avatar']} alt="avatar" />
        <Text style={TextStyle.H2} weight={TextWeight.BOLD} className={styles['card__text']}>
          Jessica Pierce
        </Text>
        <Text
          style={TextStyle.H3}
          weight={TextWeight.REGULAR}
          className={styles['card__text--light']}
        >
          jessica.pierce@harvard.ac.uk
        </Text>
      </div>
      <div className={styles['btn']}>
        <button className={styles['btn__inactive']} type="button">
          <Text className={styles['btn__text']}>Reject</Text>
        </button>
        <button className={styles['btn__active']} type="button">
          <Text className={styles['btn__text']}>Accept</Text>
        </button>
      </div>
    </Card>
  );
};
