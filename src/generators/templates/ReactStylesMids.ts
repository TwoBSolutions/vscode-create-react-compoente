const styledTemplate = `import { fontMaker } from '@midway/tools';
import { colors, normalize } from '@midway/tools/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1}
});

`;

export const generateMidsStyledTemplate = (): string => styledTemplate;
