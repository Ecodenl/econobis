export function capitalizeFirstLetter(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
}
export function lowerCaseFirstLetter(text) {
    if (!text) return '';
    return text.charAt(0).toLowerCase() + text.slice(1);
}
