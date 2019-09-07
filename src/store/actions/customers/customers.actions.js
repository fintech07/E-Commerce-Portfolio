export const REGISTER_CUSTOMER = 'REGISTER_CUSTOMER';
export const REGISTER_CUSTOMER_SUCCESS = 'REGISTER_CUSTOMER_SUCCESS';
export const REGISTER_CUSTOMER_ERROR = 'REGISTER_CUSTOMER_ERROR';

export const LOGIN_CUSTOMER = 'LOGIN_CUSTOMER';
export const LOGIN_CUSTOMER_SUCCESS = 'LOGIN_CUSTOMER_SUCCESS';
export const LOGIN_CUSTOMER_ERROR = 'LOGIN_CUSTOMER_ERROR';

export const registerCustomerAction = (payload) => {
    return {
        type: REGISTER_CUSTOMER,
        payload
    }
};

export const loginCustomerAction = (payload) => {
    return {
        type: LOGIN_CUSTOMER,
        payload
    }
};