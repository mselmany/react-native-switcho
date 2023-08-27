# @mselmany/react-native-switcho

Universal animated (with `react-native-reanimated`) switcher ui element. <br>
Compatiple with **ios, android, web** - _expo_.

<img src="https://github.com/mselmany/react-native-switcho/assets/1439466/1227c043-ec8e-481f-8a60-501b0ba35993" width="381" height="800" />

## Installation

```sh
npm install @mselmany/react-native-switcho
# or
yarn add @mselmany/react-native-switcho
```

## Usage

```js
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import Switcher from '@mselmany/react-native-switcho';

export default function App() {
  const [isToggled, onToggle] = useState(false);

  return (
    <Switcher
      size="medium" // number(like 100) | xlarge | large | medium | small
      value={isToggled}
      onValueChange={onToggle}
      disabled={false} // optional: true | false
      neutralColor="c8c8c8" // optional - default is #c8c8c8
      positiveColor="27cc0d" // optional - default is #27cc0d
      thumbColor="fff" // optional - default is #fff
      IconOff={<MaterialIcons name="close" size={70} />} // optional
      IconOn={<MaterialIcons name="check" size={70} />} // optional
    />
  );
}

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
