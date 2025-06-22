const stripSpace = (str: string): string => {
    // Remove spaces from string
    return str.replace(/\s+/g, '');
}

export default stripSpace;