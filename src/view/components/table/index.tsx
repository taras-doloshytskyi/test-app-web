import 'rc-pagination/assets/index.css';

import clsx from 'clsx';
import cloneDeep from 'lodash/cloneDeep';
import Pagination from 'rc-pagination';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Switch from 'react-ios-switch';
import Select from 'react-select';

import avatar from '~/view/assets/images/avatar2.png';
import search from '~/view/assets/images/search.png';
import { Icon } from '~/view/components/icon';
import { Text, TextStyle, TextWeight } from '~/view/components/text';

import { allData } from '../../../constants/data';
import styles from './styles.scss';

const tableHead = {
  member: 'Members',
  joined: 'Joined since',
  editor: 'Dump Editor',
  action: 'Actions',
};

const options = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
];

export const Table: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  const [countPerPage, setCountPerPage] = React.useState({ value: 10, label: '10' });
  const [value, setValue] = React.useState('');

  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage.value)),
  );
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const searchData = (val: string) => {
    const query = val.toLowerCase();
    setCurrentPage(1);
    const data = cloneDeep(
      allData
        .filter(item => item.member.toLowerCase().indexOf(query) > -1)
        .slice(0, countPerPage.value),
    );
    setCollection(data);
  };

  React.useEffect(() => {
    console.log('testttt');
    if (!value) {
      updatePage(1);
    } else {
      searchData(value);
    }
  }, [value, countPerPage]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const updatePage = (p: any) => {
    setCurrentPage(p);
    const to = countPerPage.value * p;
    const from = to - countPerPage.value;
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const tableRows = (rowData: any) => {
    const { key, index } = rowData;
    // eslint-disable-next-line react-hooks/rules-of-hooks

    return (
      <tr
        className={clsx(styles['tr'], {
          [styles['active-tr']]: checked,
        })}
        key={index}
      >
        <td className={styles['td']}>
          <div className={styles['content']}>
            <img src={avatar} className={styles['avatar']} alt="letter" />
            <div>
              <div className={styles['content__showblock']}>
                <Text
                  style={TextStyle.H2}
                  weight={TextWeight.BOLD}
                  className={clsx(styles['content__text'], {
                    [styles['content__text--active']]: checked,
                  })}
                >
                  {key.member}
                </Text>
                {checked ? (
                  <div className={styles['admin']}>
                    <Text className={styles['admin__text']}>Administrator</Text>
                  </div>
                ) : null}
              </div>
              <Text
                style={TextStyle.H2}
                weight={TextWeight.BOLD}
                className={styles['content__second-text']}
              >
                Tempus malesuada egestas mattis eu pretium interdum.
              </Text>
            </div>
          </div>
        </td>
        <td className={styles['td']}>
          <Text
            style={TextStyle.H2}
            weight={TextWeight.BOLD}
            className={styles['content__joined-text']}
          >
            {key.joined}
          </Text>
        </td>
        <td className={styles['td']}>
          <div />

          <Switch
            checked={checked}
            onChange={() => setChecked(!checked)}
            offColor="#EAEBEC"
            onColor="#F9ACDF"
          />
        </td>
        <td className={styles['td']}>
          <div className={styles['action']}>
            <div className={styles['action__left']}>
              <Text className={styles['action__text']}>View Profile</Text>
            </div>
            <div className={styles['action__right']}>
              <Icon name="dots" height={18} width={18} />
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td className={styles['td']} key={index}>
        {title}
      </td>
    ));
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const dropdownIndicatorStyles = (base: any) => {
    const changes = {
      // all your override styles
      color: '#FF3E9A',
    };
    return Object.assign(base, changes);
  };

  return (
    <>
      <div className={styles['search']}>
        <Text style={TextStyle.H2} weight={TextWeight.BOLD} className={styles['search__count']}>
          4,345 Active Members
        </Text>
        <div className={styles['input-wrapper']}>
          <img src={search} className={styles['search__icon']} alt="search" />
          <input
            className={styles['input-wrapper__text']}
            placeholder="Search here.."
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>
      </div>
      <table className={styles['table']}>
        <thead className={styles['thead']}>
          <tr className={styles['tr']}>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <div className={styles['paginator']}>
        <div className={styles['paginator__left']}>
          <div className={styles['paginator__left--content']}>
            <Text
              className={styles['paginator__text']}
            >{`1-${countPerPage.value} from ${allData.length}`}</Text>
            <Text className={styles['separator']}>|</Text>
          </div>
          <div className={styles['paginator__left--line']}>
            <Text className={styles['paginator__text']}>Show</Text>
            <Select
              className={styles['selector']}
              onChange={(item: { value: number; label: string }) => setCountPerPage(item)}
              options={options}
              value={countPerPage}
              styles={{
                control: (baseStyles: any, state: { isFocused: any }) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'transparent' : 'transparent',
                  border: 'none',
                }),
                dropdownIndicator: dropdownIndicatorStyles,
              }}
            />
            <Text className={styles['paginator__text']}>on each load</Text>
          </div>
        </div>
        <div className={styles['pagination']}>
          <Pagination
            pageSize={countPerPage.value}
            onChange={updatePage}
            current={currentPage}
            total={allData.length}
            style={{
              color: 'red',
            }}
          />
          {/* <Pagination
            currentPage={currentPage}
            totalCount={allData.length}
            pageSize={10}
            onPageChange={updatePage}
            // hideGoToPage={hideGoToPage}
          /> */}
        </div>
      </div>
    </>
  );
};
