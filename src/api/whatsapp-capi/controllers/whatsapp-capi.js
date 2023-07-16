'use strict';

/**
 *  whatsapp-capi controller
 */
const bizSdk = require('facebook-nodejs-business-sdk');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::whatsapp-capi.whatsapp-capi', ({ strapi }) => ({

    async postCapi(ctx) {
        const data = ctx.request.body;
        if (data.notification) {
            const notif = data.notification;
            if (notif.packageName == "org.telegram.messenger") {
                const greeting = notif.text;
                console.log("greeting", greeting)
                const entries = await strapi.entityService.findMany('api::whatsapp-capi.whatsapp-capi', {
                    filters: {
                        greeting: {
                            $eq: greeting,
                        },
                    },
                });
                if (entries.length > 0) {
                    const entry = entries[0];
                    const token = entry.token;
                    const pixel = entry.pixel;
                    const res = await this.fbEvent(ctx.request, token, pixel);
                    return entry;
                }
            }
        } else {
            return data;
        }
    },

    async fbEvent(request, token, pixel) {
        const Content = bizSdk.Content;
        const EventRequest = bizSdk.EventRequest;
        const ServerEvent = bizSdk.ServerEvent;

        const access_token = token;
        const pixel_id = pixel;
        const api = bizSdk.FacebookAdsApi.init(access_token);

        let current_timestamp = Math.floor(new Date() / 1000);
        
        const serverEvent = (new ServerEvent())
            .setEventName('Real WA')
            .setEventTime(current_timestamp)
            .setActionSource('website');

        const eventsData = [serverEvent];
        const eventRequest = (new EventRequest(access_token, pixel_id))
            .setEvents(eventsData);

        return await eventRequest.execute().then(
            response => {
                console.log('Response: ', response);
            },
            err => {
                console.error('Error: ', err);
            }
        );
    }
}));