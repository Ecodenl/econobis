import validator from 'validator';

export function checkFieldRecord(record) {
    let valueToCheck = null;

    switch (record.fieldFormatType) {
        case 'boolean':
            valueToCheck = record.fieldRecordValueBoolean;
            break;
        case 'text_short':
            valueToCheck = record.fieldRecordValueText;
            break;
        case 'text_long':
            valueToCheck = record.fieldRecordValueText;
            break;
        case 'int':
            valueToCheck = record.fieldRecordValueInt;
            break;
        case 'double_2_dec':
            valueToCheck = record.fieldRecordValueDouble;
            break;
        case 'amount_euro':
            valueToCheck = record.fieldRecordValueDouble;
            break;
        case 'date':
            valueToCheck = record.fieldRecordValueDatetime;
            break;
        case 'datetime':
            valueToCheck = record.fieldRecordValueDatetime;
            break;
    }

    let errorsMessage = {};

    if (record.mandatory == 1 && (valueToCheck == null || validator.isEmpty(valueToCheck + ''))) {
        return (errorsMessage['record' + record.id] = 'verplicht');
    }
    if (!checkMask(valueToCheck, record.mask, record.mandatory)) {
        return (errorsMessage['record' + record.id] = 'voldoet niet aan het masker: ' + record.mask);
    }
    return false;

    function checkMask(value, mask) {
        //check if the value complies with the mask
        if (value != null && !validator.isEmpty(value + '') && mask != null) {
            //explode the mask
            let explodedMask = mask.split('');
            let explodedValue = value.split('');
            let i = 0;

            //if mask contains no ? and value and mask are not the same length we can skip all this and return false
            if (!mask.includes('?') && mask.length != value.length) {
                return false;
            }

            for (i in explodedMask) {
                switch (explodedMask[i]) {
                    case '9':
                        if (!explodedValue[i] || !explodedValue[i].match(/^[0-9]$/)) {
                            return false;
                        }
                        break;
                    case 'a':
                        if (!explodedValue[i] || !explodedValue[i].match(/^[a-zA-Z]$/)) {
                            return false;
                        }
                        break;
                    case 'x':
                        if (!explodedValue[i] || !explodedValue[i].match(/^[a-zA-Z0-9]$/)) {
                            return false;
                        }
                        break;
                    default:
                        if (explodedValue[i] != explodedMask[i]) {
                            return false;
                        }
                        break;
                }
            }
        }

        return true;
    }
}
