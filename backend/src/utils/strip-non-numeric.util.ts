const stripNonNumeric = async (input: string): Promise<string> => {
    return input.replace(/\D+/g, '');
}
export default stripNonNumeric;