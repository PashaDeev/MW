
export default class SvgPath{
    constructor(img, mask, duration, startCoord) {
        this.img = img;
        this.mask = mask;
        this.duration = duration;
        this.startCoord = startCoord;
        this.svgPath = null;

        this.path = this.getPath();
        this.coef = this.getCoef();
    }

    getPath() {
        const coordIndex = 1;
        return this.mask.start.map((item, i) => {
                if (item.length > 1) {
                    return item[coordIndex].map((item, j) => {
                            return item - this.mask.end[i][coordIndex][j];
                        });
                } else {
                    return item;
                }
            });
    }

    getCoef() {
        return this.path.map((item) => {
            return item.map((item) => {
                return item / this.duration;
            });
        });
    }

    getMask(elem) {
        let help = [];

        for (let item of elem) {
            let arr = item.reduce((acc, curr) => {
                if (Array.isArray(curr)) {
                    return acc + ` ` + curr.join(` `);
                } else {
                    return acc + ` ` + curr;
                }
            }, ``);
            help.push(arr.trim());
        }

        help = help.join(` `);
        return help.trim();
    }

    getTemlate(model) {
        return `<defs>
                    <clipPath id="${this.mask.id}"  viewBox="0 0 ${this.img.width} ${this.img.height}">
                        <path id="${this.mask.id}-path" transform="translate(${this.mask.translate.x} ${this.mask.translate.y})" d="${this.getMask(model)}")"></path>
                    </clipPath> 
                </defs>`
    }

    setContainer() {
        this.container = document.createElement(`div`);
        this.container.className = `svg-container`;
        this.container.style.width = `0px`;
        this.container.style.height = `0px`;
        document.body.appendChild(this.container);
    }

    init() {
        //this.setContainer();

        this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.svg.innerHTML = this.getTemlate(this.mask.start);
        document.body.appendChild(this.svg);

        this.img.style.clipPath = `url(#${this.mask.id})`
    }

    svgPathMove() {
        let points = this.mask.start.map((item, i) => {
            return item.map((item) => {
                if (Array.isArray(item)) {
                    return item.map((item, j) => {
                        return item - this.coef[i][j] * (window.pageYOffset - this.startCoord);
                    });
                } else {
                    return item;
                }
            });
        });

        this.obj = this.svg.querySelector(`#${this.mask.id}-path`);

        this.obj.setAttribute(`d`, this.getMask(points));
    }
}