"use strict";

import * as vscode from "vscode";
import { generateRut, formatRut, cleanRut } from "rutlib";
let myStatusBarItem: vscode.StatusBarItem;

export async function activate({ subscriptions }: vscode.ExtensionContext) {
  let rutlibConsole = vscode.window.createOutputChannel("RUTlib");
  const myCommandId = "rutlib.vscode";
  let disposable = vscode.commands.registerCommand(myCommandId, () => {
    const generatedRut = generateRut();
    const generatedRutWithDots = formatRut(generatedRut);
    const generatedRutWithOutDots = formatRut(generatedRut, false);
    const generatedRutCleaned = cleanRut(generatedRut);
    vscode.window
      .showInformationMessage(
        `Copiar ${generatedRutWithDots}`,
        ...[generatedRutWithDots, generatedRutWithOutDots, generatedRutCleaned]
      )
      .then((selection) => {
        if (selection === generatedRutWithDots) {
          vscode.env.clipboard.writeText(generatedRutWithDots);
          rutlibConsole.appendLine(`Selected: ${generatedRutWithDots}`);
        }
        if (selection === generatedRutWithOutDots) {
          vscode.env.clipboard.writeText(generatedRutWithOutDots);
          rutlibConsole.appendLine(`Selected: ${generatedRutWithOutDots}`);
        }
        if (selection === generatedRutCleaned) {
          vscode.env.clipboard.writeText(generatedRutCleaned);
          rutlibConsole.appendLine(`Selected: ${generatedRutCleaned}`);
        }
      });
  });

  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  myStatusBarItem.command = myCommandId;
  myStatusBarItem.text = `Generar Rut`;
  myStatusBarItem.show();
  subscriptions.push(myStatusBarItem);
  subscriptions.push(disposable);
}
