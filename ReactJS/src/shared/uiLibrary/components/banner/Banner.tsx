import { CrossLineIcon, ExceptionIcon } from '@/shared/uiLibrary/assets/icons';
import "@/shared/uiLibrary/assets/scss/atoms/banner.scss";
import { generateRadiusClasses } from '@/shared/uiLibrary/utils/dynamicClass';
import type {
  RadiusProps,
  ResponsiveRadiusSideProps,
} from '@/shared/uiLibrary/utils/types';
import classNames from 'classnames';
import type React from 'react';
import { forwardRef, memo } from 'react';
import { BlockStack } from '../blockStack';
import { Button } from '../button';
import { InlineStack } from '../inlineStack';
import { Text } from '../text';

/*************************
 * Component props
 *************************/
type BannerVariant = 'success' | 'info' | 'warning' | 'danger';
export interface BannerProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
  actions?: React.ReactNode;
  title?: string;
  hideIcon?: boolean;
  icon?: React.ReactNode;
  variant?: BannerVariant;
  radius?: RadiusProps | ResponsiveRadiusSideProps;
  onClose?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
/*************************
 * Banner Heading Bg Color
 *************************/
const allowedHeaderBgColors = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'info',
  'warning',
  'danger',
  'white',
  'blue',
  'transparent',
] as const;
/*************************
 * Main Component
 *************************/
const Banner = memo(
  forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
    const {
      children,
      actions,
      title,
      hideIcon = false,
      icon,
      variant = 'success',
      radius,
      className,
      onClose,
      ...rest
    } = props;

    type HeaderBgColor = (typeof allowedHeaderBgColors)[number];

    const isHeaderBgColor = (value: HeaderBgColor): value is HeaderBgColor =>
      allowedHeaderBgColors.includes(value);

    const bgColor: HeaderBgColor = isHeaderBgColor(variant)
      ? variant
      : 'success';

    /*************************
     * Class generate
     *************************/
    const radiusClasses = generateRadiusClasses(radius);

    const baseClasses = classNames(`banner`, className, radiusClasses, {
      'banner--shadow': !!title,
      border: !title,
      [`border--${variant}`]: !title,
    });

    /*************************
     * Color
     *************************/
    const variantTextColors: Record<BannerVariant, 'white' | 'primary'> = {
      success: 'white',
      danger: 'white',
      info: 'primary',
      warning: 'primary',
    };
    const getTextColor = (variant: BannerVariant): 'white' | 'primary' =>
      variantTextColors[variant];

    return (
      <div
        className={baseClasses}
        {...rest}
        ref={ref}
        role="alert"
        aria-live="polite"
      >
        {title && (
          <InlineStack
            background={bgColor}
            padding={60}
            // radius={{ tl: 12, tr: 12, bl: 0, br: 0 }}
            justifyContent={'space-between'}
            borderStyle={'none'}
          >
            <div className="banner--header-left">
              {/*************************
               * icon
               *************************/}
              {!hideIcon && (
                <div className="banner--icon">
                  {icon ?? (
                    <ExceptionIcon
                      variant={variant}
                      color={
                        ['danger', 'success'].includes(variant)
                          ? '#ffffff'
                          : '#303030'
                      }
                    />
                  )}
                </div>
              )}
              {/*************************
               * Title
               *************************/}
              <div className="banner--title">
                <Text
                  size={'md'}
                  weight="semibold"
                  color={getTextColor(variant)}
                >
                  {title}
                </Text>
              </div>
            </div>
            {/*************************
             * cross icon
             *************************/}
            {onClose && (
              <div className="banner--header-right">
                <Button
                  aria-label="Close banner"
                  variant="plain"
                  color={getTextColor(variant)}
                  onClick={(e) => onClose?.(e)}
                >
                  <CrossLineIcon />
                </Button>
              </div>
            )}
          </InlineStack>
        )}

        {/*************************
         * body
         *************************/}
        <div
          className={classNames('banner--body', {
            [`banner--body-bg--color-${variant}`]: variant && !!title === false,
          })}
        >
          {/*************************
           * Icon
           *************************/}
          {!title && !hideIcon && (
            <div className="banner--icon">
              {icon ?? <ExceptionIcon variant={variant} />}
            </div>
          )}
          <BlockStack className="banner--children-actions" borderStyle={'none'}>
            {/*************************
             * Children
             *************************/}
            {children && children}
            {/*************************
             * Actions
             *************************/}
            {actions && (
              <div
                className={classNames('banner--actions', {
                  'banner--actions-gap': !!title === false,
                })}
              >
                {actions}
              </div>
            )}
          </BlockStack>
          {!title && onClose && (
            <div className="banner--close-icon">
              <Button
                aria-label="Close banner"
                variant="plain"
                color={getTextColor(variant)}
                onClick={(e) => onClose?.(e)}
              >
                <CrossLineIcon />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  })
);
export default Banner;
