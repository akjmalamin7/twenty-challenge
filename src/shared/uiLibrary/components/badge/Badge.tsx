import "@/shared/uiLibrary/assets/scss/atoms/badge.scss";
import classNames from 'classnames';
import { forwardRef } from 'react';

export interface Props extends React.ComponentProps<'span'> {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  children?: React.ReactNode;
}

const Badge = forwardRef<HTMLElement, Props>((props, ref) => {
  const { variant = 'neutral', children, className, ...rest } = props;
  const badgeClasses = classNames('badge', className, `badge--${variant}`);

  return (
    <span ref={ref} {...rest} className={badgeClasses}>
      {children}
    </span>
  );
});
// Badge.displayName = 'Badge';
export default Badge;

