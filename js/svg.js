import SvgPath from './svg-path';

export default class svg {
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
        return this.mask.start.map((item, i) => {
                 return item.map((item, j) => {
                    return item - this.mask.end[i][j];
                 });
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
        return elem.reduce((prev, curr, index, arr) => {
            if (index < arr.length - 1) {
                return prev + curr.join(`% `) + `%, `;
            } else {
                return prev + curr.join(`% `) + `%`;
            }
        }, '');
    }

    initMask() {
        if (this.mask.type === `polygon`) {
            this.img.style.clipPath = `polygon(${this.getMask(this.mask.start)})`;
        } else if (this.mask.type === `path`) {
            this.svgPath = new SvgPath(this.img, this.mask, this.duration, this.startCoord);
            this.svgPath.init();
        }
    }

    maskMove() {
        let points = this.mask.start.map((item, i) => {
            return item.map((item, j) => {
                       return item - this.coef[i][j] * (window.pageYOffset - this.startCoord);
                    });
        });

        if (this.mask.type == `polygon`) {
            let maskPoints = this.getMask(points);
            this.img.style.clipPath = `polygon(${maskPoints})`;
            this.img.style.webkitClipPath = `polygon(${maskPoints})`
        } else {
            this.svgPath.svgPathMove();
        }




    }
}