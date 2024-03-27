import classNames from 'classnames';
import { ReactNode } from 'react';

export interface Asset {
  key: string;
  value: string;
}

export interface AssetProps {
  children?: ReactNode | ReactNode[];
  asset: Asset;
  path: string;
  onClick?: (asset: Asset) => void;
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Asset = ({
  children,
  asset,
  path,
  onClick,
  className,
  iconSize = 'md',
  textSize = 'md',
}: AssetProps) => {
  return (
    <div
      onClick={() => onClick && onClick(asset)}
      className={classNames(className, 'flex font-bold')}
    >
      <div
        className={classNames('mr-2 p-2 flex items-center h-full', {
          'w-8': iconSize === 'sm',
          'w-12': iconSize === 'md',
          'w-16': iconSize === 'lg',
          'w-20': iconSize === 'xl',
        })}
      >
        <img
          src={`/coins/${path}.svg`}
          alt={path}
          className="p-[1px] rounded-full border-2 border-foreground"
        />
      </div>
      <div
        className={classNames('flex items-center', {
          'text-sm': textSize === 'sm',
          'text-md': textSize === 'md',
          'text-lg': textSize === 'lg',
          'text-xl': textSize === 'xl',
        })}
      >
        {asset.value}
        {children}
      </div>
    </div>
  );
};
