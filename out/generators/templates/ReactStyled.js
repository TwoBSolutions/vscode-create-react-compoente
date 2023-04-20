"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStyledTemplate = void 0;
const styledReactImports = `import styled from 'styled-components';`;
const styledReactNativeImports = `import styled from 'styled-components/native';`;
const styledTemplate = "export const Container = styled.div``";
const styledReactNativeTemplate = "export const Container = styled.View``";
const generateStyledTemplate = (isReactNative) => {
    if (isReactNative) {
        return `${styledReactNativeImports}

${styledReactNativeTemplate}

`;
    }
    return `${styledReactImports}

${styledTemplate}

`;
};
exports.generateStyledTemplate = generateStyledTemplate;
//# sourceMappingURL=ReactStyled.js.map