// Get measures of category
export default (measures, measureCategoryId) => {
    return measures.filter(measure => {
        const categoryMatch = measureCategoryId
            ? measure.visible && Number(measure.measureCategoryId) === Number(measureCategoryId)
            : false;

        return categoryMatch;
    });
};
