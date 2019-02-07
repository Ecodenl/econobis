export default amount => {
    if (!amount) return '';

    amount = parseFloat(amount);

    if (isNaN(amount)) return 'Ongeldig bedrag';

    return `€ ${amount.toLocaleString('nl', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};
