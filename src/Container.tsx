import React, {
  createContext,
  memo,
  type ReactNode,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import Animated, {
  type AnimateProps,
  type SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedRef,
} from 'react-native-reanimated';
import { StyleSheet, type ScrollViewProps } from 'react-native';
import { View } from 'react-native';

type ScrollerContextType = {
  scrollY: SharedValue<number>;
  containerSize: SharedValue<{ height: number }>;
  setElement: Dispatch<SetStateAction<ReactNode>>;
} | null;

const ScrollerContext = createContext<ScrollerContextType>(null);

type ScrollType = {
  children: ReactNode;
} & AnimateProps<ScrollViewProps>;

export const Container = memo((props: ScrollType) => {
  const [element, setElement] = useState<ReactNode>(null);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const containerSize = useSharedValue({ height: 0 });
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        containerSize.value.height = event.layoutMeasurement.height;
        scrollY.value = event.contentOffset.y;
      },
    },
    []
  );

  const value = useMemo<ScrollerContextType>(
    () => ({
      containerSize,
      scrollY,
      setElement,
    }),
    [containerSize, scrollY, setElement]
  );

  return (
    <ScrollerContext.Provider value={value}>
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          {...props}
        />
        {element}
      </View>
    </ScrollerContext.Provider>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
});

export function useScroller() {
  const context = useContext(ScrollerContext);
  if (!context) {
    throw new Error('useScroller must be used within a ScrollerProvider');
  }
  return context;
}
