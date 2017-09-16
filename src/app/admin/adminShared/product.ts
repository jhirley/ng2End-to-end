export class Product {
    constructor(
        public name: string,
        public description: string,
        public price: number,
        public imgTitle: string,
        public img: any,
        public id?: string
    ){}

}