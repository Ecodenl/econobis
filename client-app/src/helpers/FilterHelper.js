export default (rawFilter) => {
    const filterArray = [];

    for (let key in rawFilter) {
        if(rawFilter[key].data !== ''){
            filterArray.push(rawFilter[key]);
        }
    }

    return filterArray;
};
