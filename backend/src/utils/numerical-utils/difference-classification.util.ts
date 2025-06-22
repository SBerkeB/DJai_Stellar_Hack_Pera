const classifyDifference = (checkerNumber: number, checkedNumber: number) => {
    const difference = Math.abs(checkedNumber) - Math.abs(checkerNumber);
    if (difference < 0) {
        return 'negative';
    }
    if (difference > 0) {
        return 'positive';
    }
    return 'neutral';
}

export default classifyDifference;