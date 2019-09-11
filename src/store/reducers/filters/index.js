import * as filtersActions from '../../actions/filters';

const initialState = {
    colors: [],
    size: [],
    price_range: [],
    query: null,
    department_id: null,
    category_id: null,
    page: 1,
    offset: 0,
    limit: 9,
    description_length: 120,
};

const filters = function (state = initialState, action) {
    switch (action.type) {
        case filtersActions.UPDATE_FILTER:
            {
                return {
                    ...state,
                    ...action.payload,
                };
            }
        default:
            return state;
    }
}

export default filters;