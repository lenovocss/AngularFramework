define(["require","angular","angular-grid"], function(require,ng) { 
	return angular.module('app.components',["ui.grid", "ui.grid.edit", "ui.grid.selection", "ui.grid.infiniteScroll", "ui.grid.autoResize","ui.grid.expandable", "ui.grid.pinning"]);
});