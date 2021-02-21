var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	function reset() {
		let gameEngine = new GameEngine();

		gameEngine.init(ctx);

		let rule = parseInt(document.getElementById('rule').value, 10);

		gameEngine.addEntity(new Automata(gameEngine, rule));

		gameEngine.start();
	};

	var button = document.getElementById('reset');
	button.addEventListener('click', reset);

	reset();

});
