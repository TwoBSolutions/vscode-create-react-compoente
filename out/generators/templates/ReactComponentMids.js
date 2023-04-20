"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMidsComponentTemplate = void 0;
const reactNativeImports = `import React from 'react';
import { View, Text } from 'react-native';
import { BasePage, Text } from '@midway/ui'

import styles from './styles';
`;
const reactImports = `import React from 'react';`;
const generateMidsComponentTemplate = (componentName, isReactNative) => {
    const importStatement = isReactNative ? reactNativeImports : reactImports;
    const componentTemplate = `${importStatement}

const ${componentName} = () => {
  return (
    <BasePage styleContainer={styles.container} title={'${componentName}'}>
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
exports.generateMidsComponentTemplate = generateMidsComponentTemplate;
//# sourceMappingURL=ReactComponentMids.js.map