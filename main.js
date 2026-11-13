var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	var $ = function (id) { return document.getElementById(id); };

	// One engine for the page; a reset swaps in a new automaton and clears the canvas.
	// (Each reset used to start another game loop on top of the old ones.)
	var gameEngine = new GameEngine();
	gameEngine.init(ctx);
	gameEngine.start();

	var random = false;
	function reset() {
		var rule = parseInt($('rule').value, 10);
		$('ruleOut').textContent = rule;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		gameEngine.entities = [new Automata(gameEngine, rule, random)];
	};

	$('reset').addEventListener('click', function () { random = false; reset(); });
	$('random').addEventListener('click', function () { random = true; reset(); });
	$('rule').addEventListener('input', function () { $('ruleOut').textContent = this.value; });
	$('rule').addEventListener('change', reset);
	$('preset').addEventListener('change', function () {
		if (this.value === '') return;
		$('rule').value = this.value;
		this.value = '';
		reset();
	});
	$('picker').appendChild(CB.theme.picker());

	reset();
});
