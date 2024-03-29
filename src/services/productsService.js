import axios from 'axios';
import EventEmitter from '../utils/EventEmitter';
import systemConfig from '../config/system';

class productsService extends EventEmitter {

    constructor() {
        super();

        this.setDefaults();
    }

    setDefaults = () => {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
    };

    checkProduct = (p, filters) => {
        const price = p.discounted_price > 0 ? p.discounted_price : p.price
        if (price > filters.price_range[1] || price < filters.price_range[0]) 
            return false;
        return true
    }

    getAllProducts = ({filters, page, limit, description_length }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + '/products', {
                params: {
                    page,
                    limit,
                    description_length
                }
            }).then(response => {
                let { data } = response;

                if (!!filters) {
                    data.rows = data.rows.filter(p => {
                        return this.checkProduct(p, filters);
                    });
                    data.count = data.rows.length;
                }

                resolve(data);
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    searchProducts = ({ query_string, all_words, page, limit, description_length }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + '/products/search', {
                params: {
                    query_string,
                    all_words,
                    page,
                    limit,
                    description_length
                }
            }).then(response => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    getProductsInCategory = ({category_id, filters, page, limit, description_length }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/products/inCategory/${category_id}`, {
                params: {
                    page,
                    limit,
                    description_length
                }
            }).then(response => {
                let { data } = response;
                if (!!filters) {
                    data.rows = data.rows.filter(p => {
                        return this.checkProduct(p, filters);
                    });
                    data.count = data.rows.length;
                }
                resolve(data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    getProductsInDepartment = ({department_id , filters, page, limit, description_length }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/products/inDepartment/${department_id}`, {
                params: {
                    page,
                    limit,
                    description_length
                }
            }).then(response => {
                let { data } = response;
                if (!!filters) {
                    data.rows = data.rows.filter(p => {
                        return this.checkProduct(p, filters)
                    });
                    data.count = data.rows.length;
                }
                resolve(data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    /* ---------------------------------------------- */
    /* The Following Methods are for a single product */
    /* ---------------------------------------------- */

    getProductById = ({ product_id }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/products/${product_id}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    getProductDetails = ({ product_id }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/products/${product_id}/details`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    getProductLocations = ({ product_id }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/products/${product_id}/locations`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    getProductReviews = ({ product_id }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/products/${product_id}/reviews`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    createProductReview = ({ product_id, review, rating }) => {
        return new Promise((resolve, reject) => {
            axios.post(systemConfig.serverBaseUrl + `/products/${product_id}/reviews`, {
                review,
                rating
            }).then(response => {
                resolve(response);
            }).catch((error) => {
                reject(error.response);
            });
        });
    };
}

const instance = new productsService();

export default instance;