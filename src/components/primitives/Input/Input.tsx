import React, { memo, forwardRef } from 'react';
import type { IInputProps } from './types';
import InputBase from './InputBase';
import { useFormControl } from '../../composites/FormControl';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { useHover } from '@react-native-aria/interactions';
import { extractInObject, stylingProps } from '../../../theme/tools/utils';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { mergeRefs } from '../../../utils';
import { Stack } from '../Stack';

const Input = (
  { isHovered: isHoveredProp, isFocused: isFocusedProp, ...props }: IInputProps,
  ref: any
) => {
  const inputProps = useFormControl({
    isDisabled: props.isDisabled,
    isInvalid: props.isInvalid,
    isReadOnly: props.isReadOnly,
    isRequired: props.isRequired,
    nativeID: props.nativeID,
  });
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = (focusState: boolean, callback: any) => {
    setIsFocused(focusState);
    callback();
  };

  const _ref = React.useRef(null);
  const { isHovered } = useHover({}, _ref);

  const inputThemeProps = {
    isDisabled: inputProps.disabled,
    isInvalid: inputProps.accessibilityInvalid,
    isReadOnly: inputProps.accessibilityReadOnly,
    isRequired: inputProps.required,
  };

  const {
    InputLeftElement,
    InputRightElement,
    leftElement,
    rightElement,
    onFocus,
    onBlur,
    wrapperRef,
    _stack,
    _complexInputBase,
    ...resolvedProps
  } = usePropsResolution(
    'Input',
    {
      ...inputThemeProps,
      ...props,
    },
    {
      isDisabled: inputThemeProps.isDisabled,
      isHovered: isHoveredProp || isHovered,
      isFocused: isFocusedProp || isFocused,
      isInvalid: inputThemeProps.isInvalid,
      isReadOnly: inputThemeProps.isReadOnly,
    }
  );

  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [
    ...stylingProps.margin,
    ...stylingProps.border,
    ...stylingProps.layout,
    ...stylingProps.flexbox,
    ...stylingProps.position,
    ...stylingProps.background,
    'shadow',
    'opacity',
  ]);

  const [, baseInputProps] = extractInObject(nonLayoutProps, ['variant']);

  //TODO: refactor for responsive prop
  if (useHasResponsiveProps(props)) {
    return null;
  }
  if (InputLeftElement || InputRightElement || leftElement || rightElement) {
    return (
      <Stack {..._stack} {...layoutProps} ref={mergeRefs([_ref, wrapperRef])}>
        {InputLeftElement || leftElement
          ? InputLeftElement || leftElement
          : null}
        <InputBase
          InputLeftElement={InputLeftElement}
          InputRightElement={InputRightElement}
          leftElement={leftElement}
          rightElement={rightElement}
          inputProps={inputProps}
          {...baseInputProps}
          {..._complexInputBase}
          disableFocusHandling
          ref={ref}
          onFocus={(e) => {
            handleFocus(true, onFocus ? () => onFocus(e) : () => {});
          }}
          onBlur={(e) => {
            handleFocus(false, onBlur ? () => onBlur(e) : () => {});
          }}
        />
        {InputRightElement || rightElement
          ? InputRightElement || rightElement
          : null}
      </Stack>
    );
  } else {
    return (
      <InputBase
        inputProps={inputProps}
        isHovered={isHoveredProp}
        isFocused={isFocusedProp}
        {...props}
        ref={ref}
        onFocus={(e) => {
          handleFocus(true, onFocus ? () => onFocus(e) : () => {});
        }}
        onBlur={(e) => {
          handleFocus(false, onBlur ? () => onBlur(e) : () => {});
        }}
      />
    );
  }
};

export default memo(forwardRef(Input));
