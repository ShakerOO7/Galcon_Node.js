const roomMnager = require('./RoomManager');

const minWidth = -7.5;
const maxWidth = 7.5;
const minHeight = -2.5;
const maxHeight = 4.5;
const minRaduis = 0.5;
const maxRaduis = 0.9;

function dist(x, y) {
    return Math.sqrt(x * x + y * y);
}

function getRand(min, max) {
    return Math.random() * (max - min) + min;
}

class Planet {
    ID;
    x;
    y;
    r;
    shipsCount;
    motherPlanet;
    ownerID;

    constructor(ID) {
        this.ID = ID;
        if (ID < roomMnager.getRoomSize()) {

            const tempx1 = getRand(minWidth, minWidth + 2);
            const tempx2 = getRand(maxWidth, maxWidth - 2);
            const tempy = getRand(minHeight, maxHeight);

            const tempy1 = getRand(minHeight, minHeight + 1);
            const tempy2 = getRand(maxHeight, maxHeight - 1);
            const tempx = getRand(minWidth, maxWidth);

            if (Math.floor(getRand(0, 10)) % 2 == 0) {
                if (Math.floor(getRand(0, 10)) % 2 == 0) {
                    this.x = tempx1;
                }
                else {
                    this.x = tempx2;
                }
                this.y = tempy;
            } else {
                if (Math.floor(getRand(0, 10)) % 2 == 0) {
                    this.y = tempy1;
                }
                else {
                    this.y = tempy2;
                }
                this.x = tempx;
            }


            this.r = maxRaduis + 0.15;
            this.shipsCount = 100;
            this.motherPlanet = true;
            this.ownerID = ID;
        } else {
            this.x = getRand(minWidth, maxWidth);
            this.y = getRand(minHeight, maxHeight);
            this.r = getRand(minRaduis, maxRaduis);
            this.shipsCount = Math.floor(getRand(25, 75));
            this.motherPlanet = false;
            this.ownerID = 404;
        }
    }

}

const generate = () => {
    galaxy = [];
    let tries = 0;

    for (let i = 0; i < 20; i++) {

        let ok = true;

        const current = new Planet(i);

        if (current.y > 3.6 && current.x > 6.6) {
            ok = false;
        }

        galaxy.forEach(element => {
            if (dist(Math.abs(element.x - current.x), Math.abs(element.y - current.y))
                <= element.r + current.r + 0.8) {
                ok = false;
            }
        });

        if (ok) {
            galaxy.push(current);
        }
        else if (tries > 500) {
            return JSON.parse(JSON.stringify(galaxy));
        }
        else {
            tries++;
            i--;
            continue;
        }
    }

    return JSON.parse(JSON.stringify(galaxy));

}

module.exports.generate = generate;