export default amount => {
    if (!amount) amount = 0;
    // if (isNaN(amount)) {
    //     amount = amount.replace(',', '.');
    // }
    amount = parseFloat(amount * 100) / 100;

    if (isNaN(amount)) return 'Ongeldig bedrag';

    return `€ ${amount.toLocaleString('nl', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};
