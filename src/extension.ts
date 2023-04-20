import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('createreactcomponent', async () => {
    const componentName = await vscode.window.showInputBox({ prompt: 'Nome do componente' });
    if (!componentName) {
      return;
    }

    const componentType = await vscode.window.showQuickPick(['React', 'React Native'], { placeHolder: 'Selecione o tipo de componente' });
    if (!componentType) {
      return;
    }

    const fileType = await vscode.window.showQuickPick(['tsx', 'js', 'jsx'], { placeHolder: 'Selecione o tipo de arquivo' });
    if (!fileType) {
      return;
    }

    const folderUri = await vscode.window.showOpenDialog({
      canSelectFolders: true,
      canSelectFiles: false,
      canSelectMany: false,
      openLabel: 'Selecione a pasta do componente'
    });
    
    if (!folderUri || folderUri.length === 0) {
      return;
    }
    
    const currentDir = folderUri[0].fsPath;
    if (currentDir) {
      console.log("🚀 ~ file: extension.ts:25 ~ disposable ~ currentDir:", currentDir)
      const componentDir = path.join(currentDir, componentName);
      console.log("🚀 ~ file: extension.ts:26 ~ disposable ~ componentDir:", componentDir)
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir);
      }

      // Criação do arquivo Component.extensao
      const componentTemplate = generateComponentTemplate(componentName, componentType === 'React Native');
      const componentPath = path.join(componentDir, `${componentName}.${fileType}`);
      fs.writeFileSync(componentPath, componentTemplate);

      // Criação do arquivo component.styled.extensao
      const styledTemplate = generateStyledTemplate();
      const styledPath = path.join(componentDir, `${componentName.toLowerCase()}.styled.${fileType === 'tsx' ? 'ts' : fileType}`);
      fs.writeFileSync(styledPath, styledTemplate);

      // Criação do arquivo index.extensao
      const indexPath = path.join(componentDir, `index.${fileType === 'tsx' ? 'ts' : fileType}`);
      const indexTemplate = `export { default } from './${componentName}';\n`;
      fs.writeFileSync(indexPath, indexTemplate);

      const openPath = vscode.Uri.file(componentPath);
      vscode.workspace.openTextDocument(openPath).then((doc) => vscode.window.showTextDocument(doc));
    }
  });

  context.subscriptions.push(disposable);
}

function generateComponentTemplate(componentName: string, isReactNative: boolean): string {
  const importStatement = isReactNative ? "import { View, Text } from 'react-native';" : "import React from 'react';";
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
