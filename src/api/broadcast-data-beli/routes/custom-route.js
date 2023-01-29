module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/broadcast-data-beli/get-data-beli',
            handler: 'broadcast-data-beli.get_bc_data_beli',
        },
        {
            method: 'PUT',
            path: '/broadcast-data-beli/update_broadcast_data',
            handler: 'broadcast-data-beli.update_broadcast_data',
        },
    ]
}
