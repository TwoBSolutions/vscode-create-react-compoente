"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComponentTemplate = void 0;
const generateImports = (componentName, isReactNative) => {
    if (isReactNative) {
        return `import React from 'react';
import { View, Text } from 'react-native';
import { Container } from './${componentName.toLowerCase()}.styled';
`;
    }
    return `import React from 'react';
import { Container } from './${componentName.toLowerCase()}.styled';
`;
};
const generateComponentTemplate = (componentName, isReactNative) => {
    const importStatement = generateImports(componentName, isReactNative);
    const componentTemplate = `${importStatement}

const ${componentName} = () => {
  return (
    <View>
      <Text>${componentName}</Text>
    </View>
  );
};

export default ${componentName};
`;
    return componentTemplate;
};
exports.generateComponentTemplate = generateComponentTemplate;
//# sourceMappingURL=ReactComponentTemplate.js.map