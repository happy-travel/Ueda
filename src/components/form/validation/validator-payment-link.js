import * as Yup from 'yup';

export const ValidatorPaymentLink = Yup.object().shape({
    amount: Yup.string()
        .required('*'),
    email: Yup.string()
        .required('*'),
    currency: Yup.string()
        .required('*'),
    commentary: Yup.string()
        .required('*'),
})