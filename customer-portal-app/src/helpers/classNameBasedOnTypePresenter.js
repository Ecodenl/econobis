export default field => {
    switch (field.type) {
        case 'date':
        case 'string':
            return 'text-left';
        case 'decimal':
        case 'money':
        case 'integer':
            return 'text-right';
        default:
            return 'text-left';
    }
};
