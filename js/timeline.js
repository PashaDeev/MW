export default class timeline {
    constructor() {
        this.timeline = document.querySelector(`.timeline`);

    }

    start() {
        this.timeline.style.display = `block`;
    }

    end() {
        this.timeline.style.display = `none`;
    }

    startCoord() {
        let collect = document.querySelector(`.start-timeline`);
        const coord = collect.getBoundingClientRect();
        return coord.top + window.pageYOffset + 600;
    }

    init() {
        document.addEventListener(`scroll`, () => {
            if (pageYOffset >= this.startCoord()) {
                this.start();
            } else {
                this.end();
            }
        });
    }
}