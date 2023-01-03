import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  large?: boolean;
}

export const Card: React.FC<Props> = ({ className, children, onClick, large = false }) => {
  const combinedClassName = React.useMemo(() => {
    return clsx(className, styles['card'], { [styles['card--large']]: large });
  }, [className, large]);

  if (onClick) {
    return (
      <button type="button" className={combinedClassName} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <div className={combinedClassName}>{children}</div>;
};
