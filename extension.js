// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "hamlang-interpreter.gohamlang",
    function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor");
        return;
      }

      const document = editor.document;
      const fileName = document.fileName;

      document.save().then(() => {
        console.log(vscode.window.activeTerminal.name);
        if (vscode.window.activeTerminal.name == "Run hamlang") {
          const terminal = vscode.window.activeTerminal;
          terminal.show();
          terminal.sendText(`hamlang ${fileName}`);
        } else {
          const terminal = vscode.window.createTerminal(`Run hamlang`);
          terminal.show();
          terminal.sendText(`hamlang ${fileName}`);
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
