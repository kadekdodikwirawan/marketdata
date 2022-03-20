module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/customers/bywa/:id',
            handler: 'customer.findCustomerByWhatsapp',
        },
    ]
}