import React, { memo, useLayoutEffect, type ReactNode } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { useScroller } from './Container';

type ElementType = {
  children: ReactNode;
};

export const Element = memo(({ children, ...props }: ElementType) => {
  const { containerSize, scrollY, setElement } = useScroller();

  const animatedRef = useAnimatedRef<Animated.View>();

  const highlighEffectStyle = useAnimatedStyle(() => {
    const { pageY, y, height: elementHeight } = measure(animatedRef) ?? {};
    if (!pageY) {
      return { opacity: 0 };
    }
    const diff = y - containerSize.value.height;
    const currentDiff = pageY - y;
    const elementBottomPoint = elementHeight + diff;

    console.log({
      containerSize: containerSize.value.height,
      pageY: Math.round(pageY),
      y,
      diff,
      elementBottomPoint,
      elementHeight,
      scrollY: Math.round(scrollY.value),
    });
    const opacity = interpolate(
      scrollY.value,
      [0, elementBottomPoint * 2],
      [1, 0],
      Extrapolate.CLAMP
    );
    const shadowRadius = interpolate(
      scrollY.value,
      [0, elementBottomPoint],
      [50, 60],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      shadowRadius,
    };
  }, []);

  useLayoutEffect(() => {
    setElement(
      <Animated.View style={[styles.highlighEffect, highlighEffectStyle]}>
        {/* {children} */}
      </Animated.View>
    );
  }, [highlighEffectStyle, setElement]);

  return (
    <Animated.View {...props} ref={animatedRef} style={[styles.element]}>
      {children}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  element: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'orange',
    padding: 10,
  },
  highlighEffect: {
    position: 'absolute',
    bottom: -100,
    height: 100,
    left: 0,
    right: 0,
    backgroundColor: 'blue',
    padding: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: -50,
    },
    shadowOpacity: 1,
    shadowRadius: 50,

    elevation: 50,
  },
});
