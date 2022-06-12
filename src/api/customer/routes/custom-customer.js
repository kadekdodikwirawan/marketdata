module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/customers/bywa/:id',
            handler: 'customer.findCustomerByWhatsapp',
        },
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/customers/bcfn',
            handler: 'customer.broadcastFn',
        },
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/customers/getbcdata',
            handler: 'customer.dataToBc',
        },
    ]
}