const stripNumericandPunctuation = (text: string): string => {
    // Remove all digits, spaces, and non-word characters
    return text.replace(/[\d\s\W]/g, "");
}

export default stripNumericandPunctuation;