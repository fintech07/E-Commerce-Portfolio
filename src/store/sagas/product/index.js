import { all } from 'redux-saga/effects';
import { getSingleProductWatcher } from './single_product.saga';
import { getProductDetailsWatcher } from './product_details.saga';
import { getProductLocationsWatcher } from './product_locations.saga';
import { getProductReviewsWatcher, createProductReviewsWatcher } from './product_reviews.saga';

export default function* productsSaga() {
    yield all([
        getSingleProductWatcher(),
        getProductDetailsWatcher(),
        getProductLocationsWatcher(),
        getProductReviewsWatcher(),
        createProductReviewsWatcher(),
    ]);
}