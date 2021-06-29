import * as Yup from 'yup';

export const ValidatorTransferBalance = Yup.object().shape({
    amount: Yup.string()
        .required('*'),
    reason: Yup.string()
        .required('*'),
})