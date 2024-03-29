import * as Actions from '../../actions';

const initialState = {
    data      : {
        rows: []
    },
    isLoading: false,
    error: false
};

const allProductsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_PRODUCTS:
        {
            return {
                ...state,
                isLoading: true,
                error: false
            };
        }
        case Actions.GET_ALL_PRODUCTS_SUCCESS:
        {
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: false
            };
        }
        case Actions.GET_ALL_PRODUCTS_ERROR:
        {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        }
        case Actions.GET_PRODUCTS_IN_CATEGORY_SUCCESS:
        {
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: false
            };
        }
        case Actions.GET_PRODUCTS_IN_DEPARTMENT_SUCCESS:
            {
                return {
                    ...state,
                    data: action.payload,
                    isLoading: false,
                    error: false
                };
            }
        case Actions.GET_PRODUCTS_SEARCH_SUCCESS:
            {
                return {
                    ...state,
                    data: action.payload,
                    isLoading: false,
                    error: false
                };
            }
            case Actions.GET_PRODUCTS_SEARCH_ERROR:
                {
                    console.log(action.payload);
                    break;
                }
        default:
        {
            return state;
        }
    }
};

export default allProductsReducer;