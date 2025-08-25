import '@/shared/uiLibrary/assets/scss/atoms/skeletonDisplayText.scss';
import { getResponsiveClasses } from '@/shared/uiLibrary/utils/dynamicClass';
import classNames from 'classnames';
import { forwardRef } from 'react';

type Sizes = 'xs' | 'sm' | 'md' | 'lg';
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  line?: number;
  size?: { xs?: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
}
const SkeletonDisplayText = forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const { line = 2, size = 'sm', className, ...rest } = props;

    const lineCount =
      typeof line === 'number'
        ? Array.from({ length: line })
        : Array.from({ length: parseInt(line, 10) });
    const skeletonSizes = getResponsiveClasses('skeleton--display-text', size);

    return (
      <div ref={ref} className={classNames('skeleton', className)} {...rest}>
        {/*********************************
         *  Content can be added here if needed, or left empty for a pure skeleton effect
         *  This allows for flexibility in how the skeleton is displayed
         **********************************/}
        <div className={`skeleton--display-text`}>
          {lineCount.map((_, bdTextIndex) => {
            const isLast = bdTextIndex === lineCount.length - 1;
            return (
              <span
                key={bdTextIndex}
                className={classNames(
                  'skeleton--display-text--line',
                  skeletonSizes,
                  isLast && 'skeleton--display-text--line-last'
                )}
              ></span>
            );
          })}
        </div>
      </div>
    );
  }
);
SkeletonDisplayText.displayName = 'SkeletonDisplayText';
export default SkeletonDisplayText;
