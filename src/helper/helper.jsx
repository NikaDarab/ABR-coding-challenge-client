export const uniqueRegions = (data) => {
    const regions = [];
    data.forEach((item) => {
        if (!regions.includes(item.region)) {
            regions.push(item.region);
        }
    });
    return regions;
}

export const averageCalories = (data) => {
    console.log(data)
    let total = 0;
    data.forEach((item) => {
        total += item.Calories;
    });
    return total / data.length;
}
