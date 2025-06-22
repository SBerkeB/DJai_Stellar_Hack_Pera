const calculatePercentageDifference = (base: number, next: number): number => {
    return Math.abs((next - base) / base) * 100;
}

export default calculatePercentageDifference;