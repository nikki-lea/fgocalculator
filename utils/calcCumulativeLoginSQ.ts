const calcCumulativeLoginSQ = (cumulativeLoginsCount: number, dailyLogins: number) : number => {
    const finalCumulativeLogins = cumulativeLoginsCount + dailyLogins;
    let cumulativeLoginSQ = 0;
    for (let i = cumulativeLoginsCount; i < finalCumulativeLogins; i++) {
        if (i ===  10 || i === 20 || i === 30 || i === 40 || i === 50) {
            cumulativeLoginSQ = cumulativeLoginSQ + 4;
        } else if (i === 75) {
            cumulativeLoginSQ = cumulativeLoginSQ + 10;
        } else if (i === 100) {
            cumulativeLoginSQ = cumulativeLoginSQ + 30;
        } else if (i % 50 === 0) {
            cumulativeLoginSQ = cumulativeLoginSQ + 30;
        }
    }
    return cumulativeLoginSQ;
}

export default calcCumulativeLoginSQ;