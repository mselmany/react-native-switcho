import 'react-native-reanimated';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Switcher from '@mselmany/react-native-switcho';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [isToggled, onToggle] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text>Custom size: 100</Text>
        <Switcher
          size={150}
          value={isToggled}
          onValueChange={onToggle}
          IconOff={<MaterialIcons name="close" size={70} />}
          IconOn={<MaterialIcons name="check" size={70} />}
        />
        <Text>Predefined size: xlarge and icons</Text>
        <Switcher
          size="xlarge"
          value={isToggled}
          onValueChange={onToggle}
          IconOff={<MaterialIcons name="gps-off" size={16} />}
          IconOn={<MaterialIcons name="gps-fixed" size={16} />}
        />
        <Text>Predefined size: large</Text>
        <Switcher size="large" value={isToggled} onValueChange={onToggle} />
        <Text>Predefined size: medium</Text>
        <Switcher value={isToggled} onValueChange={onToggle} />
        <Text>Predefined size: small</Text>
        <Switcher size="small" value={isToggled} onValueChange={onToggle} />
        <Text>disabled</Text>
        <Switcher disabled value={isToggled} onValueChange={onToggle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  inner: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 10,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
