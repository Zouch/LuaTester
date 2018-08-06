const vscode = require('vscode');
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.Send', function () {
        var net = require('net')
        var connection = new net.Socket();
        connection.connect(50000,'localhost');
        connection.end(vscode.window.activeTextEditor.document.fileName);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.SendSelection', function () {
        var net = require('net')
        var connection = new net.Socket();

        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        if (!selection.isEmpty) {
            const text = editor.document.getText(selection);
            connection.connect(50000,'localhost');
            connection.end(`666${text}`);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
