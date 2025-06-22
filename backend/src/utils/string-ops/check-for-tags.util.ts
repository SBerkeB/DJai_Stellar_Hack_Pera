import stripSpace from "./strip-space.util";

const checkForTag = (str: string, tag: any): Boolean => {

    str = stripSpace(str);

    const doesExist = str.includes(tag);
    
    return doesExist;
};

export default checkForTag;