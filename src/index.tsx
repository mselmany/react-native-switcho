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
  radius?: number;
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

const THUMB_PADDING = 3;

const radiusMap = {
  0: 0,
  1: 1,
  2: 1,
  3: 1,
  4: 2,
} as Record<number, number>;

export const Switcher = memo((p: SwitcherProps) => {
  const options = useMemo(() => {
    const size =
      (typeof p.size === 'number' && p.size) ||
      (typeof p.size === 'string' && Sizes[p.size]) ||
      Sizes[defaults.size];
    const radius = p.radius ?? size;
    const thumbRadius = radiusMap[radius] ?? radius - THUMB_PADDING;
    return {
      ...defaults,
      ratioActive: defaults.ratio + defaults.ratio * 0.2,
      size,
      radius,
      thumbRadius,
      ...(p.neutralColor && { neutralColor: p.neutralColor }),
      ...(p.positiveColor && { positiveColor: p.positiveColor }),
      ...(p.thumbColor && { thumbColor: p.thumbColor }),
    };
  }, [p.size, p.neutralColor, p.positiveColor, p.thumbColor, p.radius]);

  const sizeValue = options.size;
  const isActive = p.value ?? false;
  const hasIcon = Boolean(p.IconOff && p.IconOn);
  const ratio = options.ratio;
  const ratioActive = options.ratioActive;
  const borderRadius = options.radius;

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
      style={[styles.pressable, { borderRadius }, bgStyle]}
      onPressIn={onPressInOut(true)}
      onPressOut={onPressInOut(false)}
      onPress={() => p.onValueChange?.(!isActive)}
    >
      <Animated.View style={[styles.thumbWrapper, transformStyle]}>
        <View
          style={[
            styles.thumb,
            {
              backgroundColor: options.thumbColor,
              borderRadius: options.thumbRadius,
            },
          ]}
        >
          {hasIcon && (
            <>
              <Animated.View
                style={[
                  styles.iconView,
                  { borderRadius: options.thumbRadius },
                  iconOffStyle,
                ]}
              >
                {p.IconOff}
              </Animated.View>
              <Animated.View
                style={[
                  styles.iconView,
                  { borderRadius: options.thumbRadius },
                  iconOnStyle,
                ]}
              >
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
  },
  thumbWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    padding: THUMB_PADDING,
  },
  thumb: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
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
