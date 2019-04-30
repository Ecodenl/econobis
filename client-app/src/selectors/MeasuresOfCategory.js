// Get measures of category
export default (measures, measureCategoryId) => {
    return measures.filter(measure => {
        const categoryMatch = measureCategoryId
            ? Number(measure.measureCategoryId) === Number(measureCategoryId)
            : measure.measureCategoryId;

        return categoryMatch;
    });
};
