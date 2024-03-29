import { all } from 'redux-saga/effects';
import { getAllProductsWatcher, getProductsInCategory, getProductsInDepartment, getProductsSearch } from './get_all_products.saga';

export default function* productsSaga() {
    yield all([
        getAllProductsWatcher(),
        getProductsInCategory(), 
        getProductsInDepartment(),
        getProductsSearch(),
    ]);
}