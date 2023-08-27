import React, { memo, useCallback, type ReactElement, useMemo } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type SwitcherProps = {
  value: boolean;
  onValueChange(value: boolean): void;
  size?: keyof typeof Sizes | number;
  disabled?: boolean;
  neutralColor?: string;
  positiveColor?: string;
  thumbColor?: string;
  IconOff?: ReactElement;
  IconOn?: ReactElement;
};

const Sizes = {
  small: 30,
  medium: 40,
  large: 50,
  xlarge: 60,
} as const;

const defaults = {
  size: 'medium' as keyof typeof Sizes,
  ratio: 0.65,
  neutralColor: '#c8c8c8',
  positiveColor: '#27cc0d',
  thumbColor: '#fff',
};

export const Switcher = memo((p: SwitcherProps) => {
  const options = useMemo(() => {
    const size =
      (typeof p.size === 'number' && p.size) ||
      (typeof p.size === 'string' && Sizes[p.size]) ||
      Sizes[defaults.size];
    return {
      ...defaults,
      ratioActive: defaults.ratio + defaults.ratio * 0.2,
      size,
      ...(p.neutralColor && { neutralColor: p.neutralColor }),
      ...(p.positiveColor && { positiveColor: p.positiveColor }),
      ...(p.thumbColor && { thumbColor: p.thumbColor }),
    };
  }, [p.size, p.neutralColor, p.positiveColor, p.thumbColor]);

  const sizeValue = options.size;
  const isActive = p.value ?? false;
  const hasIcon = Boolean(p.IconOff && p.IconOn);
  const ratio = options.ratio;
  const ratioActive = options.ratioActive;

  const isPressing = useSharedValue(false);

  const onPressInOut = useCallback(
    (isIn: boolean) => () => {
      isPressing.value = isIn;
    },
    [isPressing]
  );

  const bgStyle = useAnimatedStyle(() => {
    const backgroundColor = withTiming(
      (!isPressing.value && isActive) || isActive
        ? options.positiveColor
        : options.neutralColor,
      {
        duration: 250,
      }
    );
    return {
      width: sizeValue,
      backgroundColor,
    };
  }, [isActive, options.positiveColor, options.neutralColor]);

  const transformStyle = useAnimatedStyle(() => {
    const translateX = withTiming(
      isActive
        ? sizeValue * (1 - (!isPressing.value ? ratio : ratioActive))
        : 0,
      {
        duration: 100,
      }
    );
    const width = withTiming(
      sizeValue * (isPressing.value ? ratioActive : ratio),
      { duration: 100 }
    );

    return {
      width,
      height: sizeValue * ratio,
      transform: [{ translateX }],
    };
  }, [sizeValue, isActive, options.ratio]);

  const iconOffStyle = useAnimatedStyle(() => {
    const translateX = hasIcon
      ? withTiming(isActive ? sizeValue * 0.35 * -1 : 0, {
          duration: 100,
        })
      : 0;

    const opacity = hasIcon
      ? withTiming(isActive ? 0 : 1, {
          duration: 100,
        })
      : 1;
    const scale = hasIcon
      ? withTiming(isActive ? 0.25 : 1, {
          duration: 100,
        })
      : 1;
    return {
      opacity,
      transform: [{ translateX }, { scale }],
    };
  }, [sizeValue, isActive, hasIcon]);

  const iconOnStyle = useAnimatedStyle(() => {
    const translateX = hasIcon
      ? withTiming(!isActive ? sizeValue * 0.35 : 0, {
          duration: 100,
        })
      : 0;
    const opacity = hasIcon
      ? withTiming(!isActive ? 0 : 1, {
          duration: 100,
        })
      : 1;
    const scale = hasIcon
      ? withTiming(!isActive ? 0.25 : 1, {
          duration: 100,
        })
      : 1;
    return {
      opacity,
      transform: [{ translateX }, { scale }],
    };
  }, [sizeValue, isActive, hasIcon]);

  return (
    <AnimatedPressable
      {...p}
      style={[styles.pressable, bgStyle]}
      onPressIn={onPressInOut(true)}
      onPressOut={onPressInOut(false)}
      onPress={() => p.onValueChange?.(!isActive)}
    >
      <Animated.View style={[styles.thumbWrapper, transformStyle]}>
        <View style={[styles.thumb, { backgroundColor: options.thumbColor }]}>
          {hasIcon && (
            <>
              <Animated.View style={[styles.iconView, iconOffStyle]}>
                {p.IconOff}
              </Animated.View>
              <Animated.View style={[styles.iconView, iconOnStyle]}>
                {p.IconOn}
              </Animated.View>
            </>
          )}
        </View>
      </Animated.View>
    </AnimatedPressable>
  );
});

export default Switcher;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
  pressable: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 500,
  },
  thumbWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    padding: 3,
  },
  thumb: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    borderRadius: 500,
    overflow: 'hidden',
  },
  iconView: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
