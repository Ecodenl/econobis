import * as Yup from 'yup';
import { isEmpty } from 'lodash';

export default {
    validationSchemaBasic: Yup.object().shape({
        quotationAmount: Yup.string()
            .transform(function(value, originalvalue) {
                return value ? value.replace(',', '.') : 0;
            })
            .matches(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/, 'Fout bedrag'),
    }),
};
