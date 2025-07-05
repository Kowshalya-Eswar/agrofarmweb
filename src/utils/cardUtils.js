const getOrCreateCartId = () => {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
        // slice(2) removes "0." from the random string
        cartId = 'cart_' + Math.random().toString(36).slice(2, 11);
        localStorage.setItem('cartId', cartId);
    }
    return cartId;
};

export default getOrCreateCartId;
