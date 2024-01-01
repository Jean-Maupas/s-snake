// The maximum is exclusive and the minimum is inclusive
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

// The maximum is inclusive and the minimum is inclusive
export function getRandomIntInclusive (min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// return a.every((val, idx) => val === b[idx])
// (a[0] == b[0]) && (a[1] == b[1]) 
export function findNumTuple(arr: number[][], tuple: number[]): boolean {
    return arr.find((e: number[])=>{
        return e.every((val, idx) => val === tuple[idx])
    }) != undefined // TODO: fast search through BS or Maps
}

export class Snake {
    public size: number = 50;
    public name: string;
    public board: Uint8Array; // = new Array();
    
     /**
     * @param {number} size
     */
    public constructor (size: number = 50, name: string = "") {
        //super();
        //if(!this.SIZES.includes(size)) {
        //    console.log("Size incorrect ",size);
        //    throw new Error('Invalid size parameter; values allowed: '+this.SIZES);
        //}
        this.size = size;
        this.name = name;
        this.board = new Uint8Array(size * size).fill(0);
    }
}