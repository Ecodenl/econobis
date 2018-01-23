export default (number) => {
    if(number.replace(/\D/g,'').length < 10) {
        return true;
    }
};
