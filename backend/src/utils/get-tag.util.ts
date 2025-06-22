import { predefinedTags } from "../constants";
import TagModel from "./tag.model";

const getTags = async (str: string): Promise<TagModel[]> => {
    const words = str.split(" ");
    const foundWords = words.filter(word => predefinedTags.has(word)).map(word => ({word}));
    return foundWords;
};

export {
    getTags
}