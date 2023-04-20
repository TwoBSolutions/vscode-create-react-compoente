"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
function generateComponentTemplate(componentName, isReactNative) {
    const importStatement = isReactNative
        ? "import { View, Text } from 'react-native';"
        : "import React from 'react';";
    const componentTemplate = `
${importStatement}

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
}
function generateStyledTemplate() {
    const styledTemplate = `// Adicione seus estilos aqui\n`;
    return styledTemplate;
}
const createReactComponent = (context) => {
    const disposable = vscode.commands.registerCommand("createreactcomponent", async (uri) => {
        const componentName = await vscode.window.showInputBox({
            prompt: "Nome do componente",
        });
        if (!componentName) {
            return;
        }
        const componentType = await vscode.window.showQuickPick(["React", "React Native"], { placeHolder: "Selecione o tipo de componente" });
        if (!componentType) {
            return;
        }
        const fileType = await vscode.window.showQuickPick(["tsx", "js", "jsx"], {
            placeHolder: "Selecione o tipo de arquivo",
        });
        if (!fileType) {
            return;
        }
        const activeEditor = vscode.window.activeTextEditor;
        let currentDir = null;
        if (uri && uri.fsPath) {
            currentDir = uri.fsPath;
        }
        else {
            if (activeEditor) {
                const activeDocument = activeEditor.document;
                if (activeDocument.uri.scheme === 'file') {
                    const uriPath = activeDocument.uri.path;
                    const parsedUri = vscode.Uri.parse(uriPath);
                    currentDir = parsedUri.with({ path: path.dirname(parsedUri.path) }).fsPath;
                }
            }
            if (!currentDir) {
                const folders = vscode.workspace.workspaceFolders;
                if (!folders) {
                    vscode.window.showErrorMessage('Nenhuma pasta aberta no workspace.');
                    return;
                }
                const folder = await vscode.window.showWorkspaceFolderPick();
                if (!folder) {
                    return;
                }
                currentDir = folder.uri.fsPath;
            }
        }
        if (currentDir) {
            const componentDir = path.join(currentDir, componentName);
            if (!fs.existsSync(componentDir)) {
                fs.mkdirSync(componentDir);
            }
            // Criação do arquivo Component.extensao
            const componentTemplate = generateComponentTemplate(componentName, componentType === "React Native");
            const componentPath = path.join(componentDir, `${componentName}.${fileType}`);
            fs.writeFileSync(componentPath, componentTemplate);
            // Criação do arquivo component.styled.extensao
            const styledTemplate = generateStyledTemplate();
            const styledPath = path.join(componentDir, `${componentName.toLowerCase()}.styled.${fileType === "tsx" ? "ts" : fileType}`);
            fs.writeFileSync(styledPath, styledTemplate);
            // Criação do arquivo index.extensao
            const indexPath = path.join(componentDir, `index.${fileType === "tsx" ? "ts" : fileType}`);
            const indexTemplate = `export { default } from './${componentName}';\n`;
            fs.writeFileSync(indexPath, indexTemplate);
            const openPath = vscode.Uri.file(componentPath);
            vscode.workspace
                .openTextDocument(openPath)
                .then((doc) => vscode.window.showTextDocument(doc));
        }
    });
    return disposable;
};
exports.default = createReactComponent;
//# sourceMappingURL=CreteReactComponent.js.map