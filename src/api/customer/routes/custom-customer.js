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
        { // Get bulk BC data
            method: 'POST',
            path: '/customers/getbcdata',
            handler: 'customer.dataToBc',
        },
        {
            method: 'PUT',
            path: '/customers/update_broadcast_data',
            handler: 'customer.update_broadcast_data',
        },
        {
            method: 'PUT',
            path: '/customers/reset_broadcast_data',
            handler: 'customer.reset_broadcast_data',
        }
    ]
}