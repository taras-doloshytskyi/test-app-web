import React, { useRef, useState } from 'react';
import Slider from 'react-slick';

import copy from '~/view/assets/images/copy.png';
import letter from '~/view/assets/images/letter.png';
import { Card } from '~/view/components/card';
import { Icon } from '~/view/components/icon';
import { Table } from '~/view/components/table';
import { Text, TextStyle, TextWeight } from '~/view/components/text';
import { UserCard } from '~/view/components/user-card';

import styles from './styles.scss';

export const MainPage: React.FC = () => {
  const sliderRef: any = useRef();
  const [copyText] = useState('test.so/group/code=25T47');
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyText).then(() => alert('copied'));
  };
  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <button type="button" className={styles['icon']}>
          <Icon name="arrow" width={20} height={20} />
        </button>
        <Text style={TextStyle.H2} weight={TextWeight.BOLD} className={styles['text']}>
          Group Members
        </Text>
      </div>
      <Card className={styles['cardView']}>
        <div className={styles['cardView__left']}>
          <img src={letter} className={styles['headerView__img']} alt="letter" />
          <div className={styles['cardView__text-block']}>
            <Text
              style={TextStyle.H2}
              weight={TextWeight.BOLD}
              className={styles['cardView__text']}
            >
              Invite More Member
            </Text>
            <Text
              style={TextStyle.CAPTION}
              weight={TextWeight.MEDIUM}
              className={styles['cardView__text-medium']}
            >
              Invite your friends to the organization!
            </Text>
          </div>
        </div>
        <div className={styles['cardView__right']}>
          <div>
            <Text
              style={TextStyle.H2}
              weight={TextWeight.BOLD}
              className={styles['cardView__text-mid']}
            >
              Copy and Share Group Link with code
            </Text>
            <div className={styles['clipboard']}>
              <Text
                style={TextStyle.H2}
                weight={TextWeight.BOLD}
                className={styles['cardView__text-mid']}
              >
                {copyText}
              </Text>
              <button type="button" onClick={() => copyToClipboard()}>
                <img src={copy} className={styles['cardView__icon']} alt="copy" />
              </button>
            </div>
          </div>
          <Text className={styles['separator']}>or</Text>
          <div>
            <Text
              style={TextStyle.H2}
              weight={TextWeight.BOLD}
              className={styles['cardView__text-mid']}
            >
              Send Invite by Email
            </Text>
            <div className={styles['mail']}>
              <div>
                <Text className={styles['mail__text']}>Member Email</Text>
                <input
                  type="email"
                  className={styles['mail__input']}
                  placeholder="Enter your friend email here..."
                />
              </div>
              <button className={styles['mail__btn']} type="button">
                <Text className={styles['mail__btn--text']}>Send</Text>
              </button>
            </div>
          </div>
        </div>
      </Card>
      <div className={styles['control-container']}>
        <Text
          style={TextStyle.H2}
          weight={TextWeight.BOLD}
          className={styles['control-container__text']}
        >
          7 Pending Members
        </Text>
        <div className={styles['buttons']}>
          <span className={styles['button-hide']}>Hide</span>
          <button
            type="button"
            className={styles['button-control']}
            onClick={() => sliderRef.current.slickPrev()}
          >
            <Icon name="arrow" width={24} height={24} />
          </button>
          <button
            type="button"
            className={styles['button-control']}
            onClick={() => sliderRef.current.slickNext()}
          >
            <Icon name="arrow-right" width={24} height={24} />
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {Array(7)
          .fill(true)
          .map((_, index) => {
            return <UserCard key={index} />;
          })}
      </Slider>
      <Table />
    </div>
  );
};
