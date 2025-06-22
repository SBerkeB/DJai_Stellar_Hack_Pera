import { readNewsById } from "../../DAL";

const checkNewsExistence = async (contentId: number) => {
    try {
        
        const result = await readNewsById(contentId);

        return result;
    } catch (err) {
        return err;
    }
}

export default checkNewsExistence;