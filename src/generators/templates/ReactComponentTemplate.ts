const generateImports = (componentName: string, isReactNative: boolean): string => {
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

export const generateComponentTemplate = (
  componentName: string,
  isReactNative: boolean
): string => {
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
