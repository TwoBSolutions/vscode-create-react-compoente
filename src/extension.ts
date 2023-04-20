import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { Uri } from "vscode";
import createReactComponent from "./generators/CreteReactComponent";
import createReactComponentMids from "./generators/CreteReactComponentMids";

export function activate(context: vscode.ExtensionContext) {
  const createReactComponentDisposable = createReactComponent(context);
  const createReactMidsComponentDisposable = createReactComponentMids(context);

  context.subscriptions.push(createReactComponentDisposable);
  context.subscriptions.push(createReactMidsComponentDisposable);
}

export function deactivate() {}
