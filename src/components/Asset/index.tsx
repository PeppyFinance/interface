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
}

export const Asset = (props: AssetProps) => {
  return (
    <div onClick={() => props.onClick && props.onClick(props.asset)} className="flex">
      <div className="mr-2 p-2 flex items-center w-16 h-full">
        <img
          src={`/coins/${props.path}.svg`}
          alt={props.path}
          className="p-[1px] rounded-full w-16 border-2 border-foreground"
        />
      </div>
      <div className="flex items-center text-xl font-bold">
        {props.asset.value}
        {props.children}
      </div>
    </div>
  );
};
