const styledReactImports = `import styled from 'styled-components';`
const styledReactNativeImports = `import styled from 'styled-components/native';`


const styledTemplate = "export const Container = styled.div``";
const styledReactNativeTemplate = "export const Container = styled.View``";

export const generateStyledTemplate = (isReactNative : boolean): string => {
    if (isReactNative) {
        return `${styledReactNativeImports}

${styledReactNativeTemplate}

`;
    }

    return `${styledReactImports}

${styledTemplate}

`;
};
