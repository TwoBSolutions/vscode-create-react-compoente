import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "createreactcomponent",
    async (uri: vscode.Uri) => {
      const componentName = await vscode.window.showInputBox({
        prompt: "Nome do componente",
      });
      if (!componentName) {
        return;
      }

      const componentType = await vscode.window.showQuickPick(
        ["React", "React Native"],
        { placeHolder: "Selecione o tipo de componente" }
      );
      if (!componentType) {
        return;
      }

      const fileType = await vscode.window.showQuickPick(["tsx", "js", "jsx"], {
        placeHolder: "Selecione o tipo de arquivo",
      });
      if (!fileType) {
        return;
      }

      const currentDir = uri.fsPath;
      if (currentDir) {
        const componentDir = path.join(currentDir, componentName);

        if (!fs.existsSync(componentDir)) {
          fs.mkdirSync(componentDir);
        }

        // Criação do arquivo Component.extensao
        const componentTemplate = generateComponentTemplate(
          componentName,
          componentType === "React Native"
        );
        const componentPath = path.join(
          componentDir,
          `${componentName}.${fileType}`
        );
        fs.writeFileSync(componentPath, componentTemplate);

        // Criação do arquivo component.styled.extensao
        const styledTemplate = generateStyledTemplate();
        const styledPath = path.join(
          componentDir,
          `${componentName.toLowerCase()}.styled.${
            fileType === "tsx" ? "ts" : fileType
          }`
        );
        fs.writeFileSync(styledPath, styledTemplate);

        // Criação do arquivo index.extensao
        const indexPath = path.join(
          componentDir,
          `index.${fileType === "tsx" ? "ts" : fileType}`
        );
        const indexTemplate = `export { default } from './${componentName}';\n`;
        fs.writeFileSync(indexPath, indexTemplate);

        const openPath = vscode.Uri.file(componentPath);
        vscode.workspace
          .openTextDocument(openPath)
          .then((doc) => vscode.window.showTextDocument(doc));
      }
    }
  );

  context.subscriptions.push(disposable);
}

function generateComponentTemplate(
  componentName: string,
  isReactNative: boolean
): string {
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

function generateStyledTemplate(): string {
  const styledTemplate = `// Adicione seus estilos aqui\n`;

  return styledTemplate;
}

export function deactivate() {}
