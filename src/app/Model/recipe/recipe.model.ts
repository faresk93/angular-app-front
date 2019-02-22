import {Ingredient} from '../shopping/ingredient.model';

export class Recipe {

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public image_path: string,
        public ingredients: Ingredient[]
    ) {

    }
}
