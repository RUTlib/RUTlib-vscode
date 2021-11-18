

import * as vscode from 'vscode';
import { generateRut, formatRut, cleanRut } from 'rutlib';
let myStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {

	// register a command that is invoked when the status bar
	// item is selected
	let rutlibConsole = vscode.window.createOutputChannel("RUTlib");
	const myCommandId = 'rutlib.vscode';
	
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		const generatedRut = generateRut();
		const generatedRutWithDots = formatRut(generatedRut);
		const generatedRutWithOutDots = formatRut(generatedRut,false);
		const generatedRutCleaned = cleanRut(generatedRut);
		vscode.window.showInformationMessage(`Copiar ${generatedRutWithDots}`, ...[generatedRutWithDots, generatedRutWithOutDots, generatedRutCleaned]).then(selection => {
			if (selection === generatedRutWithDots){
				vscode.env.clipboard.writeText(generatedRutWithDots);
				rutlibConsole.appendLine(`Selected: ${generatedRutWithDots}`);
			}
			if (selection === generatedRutWithOutDots){
				vscode.env.clipboard.writeText(generatedRutWithOutDots);
				rutlibConsole.appendLine(`Selected: ${generatedRutWithOutDots}`);
			}
			if (selection === generatedRutCleaned){
				vscode.env.clipboard.writeText(generatedRutCleaned);
				rutlibConsole.appendLine(`Selected: ${generatedRutCleaned}`);
			}
		  });
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = myCommandId;
	myStatusBarItem.text = `Generar Rut`;
	myStatusBarItem.show();
	subscriptions.push(myStatusBarItem);
	vscode.commands.executeCommand(myCommandId);


}





