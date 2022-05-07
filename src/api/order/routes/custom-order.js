module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/order/count-by-status',
            handler: 'order.countOrderByStatus',
        },
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/order/updatestatus',
            handler: 'order.updateStatusPengiriman',
        },
    ]
}