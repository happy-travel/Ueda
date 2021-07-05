import { price } from 'matsumoto/src/simple';

export const FormGetFormat = (accounts) => {
    return accounts?.map((item) => (
        {
            text: `Account #${item.id}: ${price(item.balance)}`,
            value: item.id
        }
    ));
}
