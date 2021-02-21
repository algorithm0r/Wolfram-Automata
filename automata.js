class Automata{
    constructor(game, rule) {
        Object.assign(this, { game });

        this.rule = [];
        this.automata = [];
        this.cache = [];

        this.first = true;

        this.width = 401;

        this.loadRule(rule);

        for (let i = 0; i < this.width; i++) {
            this.automata.push(0);
        }
        this.automata[Math.floor(this.width / 2)] = 1;
    };

    loadRule(rule) {
        for (let i = 0; i < 8; i++) {
            this.rule[i] = Math.floor(rule % Math.pow(2, i + 1) / Math.pow(2, i)) ;
        }
    };

    next(last, i) {
        let num = 0;
        num += last[i - 1] ? Math.pow(4, last[i - 1]) : 0;
        num += last[i] ? Math.pow(2, last[i]) : 0;
        num += last[i + 1] ? last[i + 1] : 0;
        return this.rule[num];
    };

    update() {
        if (this.cache.length < this.width / 2 && !this.first) {
            let last = this.automata;
            this.cache.push(last);
            this.automata = [];
            for (let i = 0; i < this.width; i++) {
                this.automata.push(this.next(last, i));
            }
        } else {
            this.first = false;
        }
    };

    draw(ctx) {
        let size = 4;
        let row = this.cache.length;
        for (let col = 0; col < this.width; col++) {
            ctx.fillStyle = this.automata[col] ? "Black" : "White";
            ctx.strokeStyle = "Grey";
            ctx.fillRect(col * size, row * size, size, size);
            ctx.strokeRect(col * size, row * size, size, size);
        }

    };
};
