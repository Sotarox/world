// tweaked from https://github.com/tailwindlabs/tailwindcss/discussions/2567
// wraps an SVG icon and applies a world-app specific gradient to it
import React, { JSX } from 'react';

function classNames(...classes: Array<string>): string {
  return classes.filter(Boolean).join(` `);
}

export interface IIconProps {
  className?: string;
  hasGradient?: boolean;
  gradientMode?: 'fill' | 'stroke' | 'both';
  stops?: Array<{
    offset?: number;
    color: string;
    opacity?: number;
  }>;
  rotateGradient?: number;
}

interface IIconParentProps extends IIconProps {
  sourceSvgWidth?: number;
  sourceSvgHeight?: number;
  children: React.ReactNode;
}

function Icon({
  children,
  className,
  stops,
  rotateGradient,
  hasGradient = false,
  gradientMode = 'fill',
  sourceSvgWidth = 24,
  sourceSvgHeight = 24,
}: IIconParentProps): JSX.Element {
  const gradientId = React.useId().replace(/:/g, '');

  const gradientUrl = `url(#${gradientId})`;

  const gradientDefs = (
    <defs>
      <linearGradient
        id={gradientId}
        gradientUnits='userSpaceOnUse'
        x1='0%'
        y1='0%'
        x2='100%'
        y2='0%'
        gradientTransform={`rotate(${
          typeof rotateGradient !== `undefined` ? rotateGradient : 25
        })`}
      >
        {stops ? (
          <>
            {stops.map((stop, index) => (
              <stop
                key={index}
                offset={
                  stop?.offset
                    ? `${stop.offset}%`
                    : index === 0
                      ? `0%`
                      : index === stops.length
                        ? `100%`
                        : `${index * (100 / (stops.length - 1))}%`
                }
                style={{
                  stopColor: stop.color,
                  stopOpacity: stop?.opacity ? stop.opacity : 1,
                }}
              />
            ))}
          </>
        ) : (
          <>
            <stop
              offset={`0%`}
              style={{
                stopColor: `#005590`,
                stopOpacity: 1,
              }}
            />
            <stop
              offset={`50%`}
              style={{
                stopColor: `#007b91`,
                stopOpacity: 1,
              }}
            />
            <stop
              offset={`100%`}
              style={{
                stopColor: `#56a730`,
                stopOpacity: 1,
              }}
            />
          </>
        )}
      </linearGradient>
    </defs>
  );

  if (React.isValidElement(children)) {
    const childElement = children as React.ReactElement<
      Record<string, unknown>
    >;
    const childProps = childElement.props;
    return React.cloneElement(childElement, {
      className: classNames(
        className ? className : `w-6 h-6 text-black`,
        typeof childProps.className === 'string' ? childProps.className : ''
      ),
      fill:
        hasGradient && (gradientMode === 'fill' || gradientMode === 'both')
          ? gradientUrl
          : childProps.fill,
      stroke:
        hasGradient && (gradientMode === 'stroke' || gradientMode === 'both')
          ? gradientUrl
          : childProps.stroke,
      children: (
        <>
          {hasGradient && gradientDefs}
          {childProps.children as React.ReactNode}
        </>
      ),
    });
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${sourceSvgWidth} ${sourceSvgHeight}`}
      className={classNames(
        hasGradient ? `` : `fill-current`,
        className ? className : `w-6 h-6 text-black`
      )}
      fill={
        hasGradient && (gradientMode === 'fill' || gradientMode === 'both')
          ? gradientUrl
          : ``
      }
      stroke={
        hasGradient && (gradientMode === 'stroke' || gradientMode === 'both')
          ? gradientUrl
          : ``
      }
    >
      {hasGradient && gradientDefs}
      {children}
    </svg>
  );
}

export { Icon };
