"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const CreteReactComponent_1 = require("./generators/CreteReactComponent");
const CreteReactComponentMids_1 = require("./generators/CreteReactComponentMids");
function activate(context) {
    const createReactComponentDisposable = (0, CreteReactComponent_1.default)(context);
    const createReactMidsComponentDisposable = (0, CreteReactComponentMids_1.default)(context);
    context.subscriptions.push(createReactComponentDisposable);
    context.subscriptions.push(createReactMidsComponentDisposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map