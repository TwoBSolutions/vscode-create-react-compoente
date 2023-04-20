"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComponentTemplate = void 0;
const reactNativeImports = `import React from 'react';
import { View, Text } from 'react-native';`;
const reactImports = `import React from 'react';`;
const generateComponentTemplate = (componentName, isReactNative) => {
    const importStatement = isReactNative ? reactNativeImports : reactImports;
    const componentTemplate = `
${importStatement}

const ${componentName} = () => {
  return (
    <BasePage styleBody={styles.container}>
      <View>
        <Text>${componentName}</Text>
      </View>
    </BasePage>
  );
};

export default ${componentName};

`;
    return componentTemplate;
};
exports.generateComponentTemplate = generateComponentTemplate;
//# sourceMappingURL=ReactComponentTemplate%20copy.js.map