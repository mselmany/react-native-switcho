# @mselmany/react-native-switcho

Universal and animated switcher ui element. (with `react-native-reanimated`)<br>
Compatiple with **ios, android, web** - _expo_.

- 🎨 All colors customizable
- Supports optional icons (for on/off status)
- 👀 Looks the same across all platforms

[Example Video](https://github.com/mselmany/react-native-switcho/assets/1439466/294cd213-a48a-4bc4-82c3-daddb6f058bd)

## Installation

```sh
npm install --save @mselmany/react-native-switcho
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
      value={isToggled}
      onValueChange={onToggle}
      size="medium" // number | xlarge | large | medium | small
      radius={25} // optional - default is equals to size
      disabled={false} // optional: true | false
      neutralColor="#c8c8c8" // optional - default is #c8c8c8
      positiveColor="#27cc0d" // optional - default is #27cc0d
      thumbColor="#fff" // optional - default is #fff
      IconOff={<MaterialIcons name="close" size={16} />} // optional
      IconOn={<MaterialIcons name="check" size={16} />} // optional
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
