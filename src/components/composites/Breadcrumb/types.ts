import type { IHStackProps } from '../../primitives/Stack/HStack';
import type { ITextProps } from '../../primitives/Text';
import type { ILinkProps } from '../../primitives/Link';
import type { IIconProps } from '../../primitives/Icon';
import type { MutableRefObject } from 'react';
import type { SpaceType } from '../../types';
export interface IBreadcrumbItemContext {
  isCurrent?: boolean;
  allChildren?: boolean;
}

export interface IBreadcrumbProps extends IHStackProps {
  spacing?: SpaceType;
  separator?: string | JSX.Element | JSX.Element[] | any;
  maxItems?: number | number[];
  _button?: any;
  isCollapsed?: boolean;
  onCollapseChange?: any;
}
export interface IBreadcrumbItemProps extends IHStackProps {
  spacing?: SpaceType;
  isCurrent?: boolean;
}
export interface IBreadcrumbIconProps extends IIconProps {
  _current?: any;
}
export interface IBreadcrumbTextProps extends ITextProps {
  _current?: any;
}
export type IBreadcrumbComponentType = ((
  props: IBreadcrumbProps & { ref?: MutableRefObject<any> }
) => JSX.Element) & {
  Item: React.MemoExoticComponent<
    (
      props: IBreadcrumbItemProps & { ref?: MutableRefObject<any> }
    ) => JSX.Element
  >;
  Link: React.MemoExoticComponent<
    (props: ILinkProps & { ref?: MutableRefObject<any> }) => JSX.Element
  >;
  Icon: React.MemoExoticComponent<
    (props: IBreadcrumbIconProps & { ref?: any }) => JSX.Element
  >;
  Text: React.MemoExoticComponent<
    (props: IBreadcrumbTextProps & { ref?: any }) => JSX.Element
  >;
};
