module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/order/knek',
            handler: 'order.knek',
        },
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/order/updatestatus',
            handler: 'order.updateStatusPengiriman',
        },
    ]
}