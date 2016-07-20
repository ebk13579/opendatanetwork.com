'use strict';

const _ = require('lodash');
const Constants = require('./constants');
const Request = require('./request');

const APP_TOKEN = 'CqcTvF7wVsI8IYAq7CdZszLbU';

class Relatives {

    static peers(region) {
        return new Promise((resolve, reject) => {
            const url = Request.buildURL(Constants.RELATED_PEER_URL, {
                app_token: APP_TOKEN,
                entity_id: region.id,
                limit: Constants.N_RELATIVES * 4
            });

            Request.getJSON(url).then(json => resolve(json), reject);
        });
    }

    static parents(region) {

        return new Promise((resolve, reject) => {
            const url = Request.buildURL(Constants.RELATED_PARENT_URL, {
                app_token: APP_TOKEN,
                entity_id: region.id,
                limit: Constants.N_RELATIVES * 4
            });

            Request.getJSON(url).then(json => resolve(json), reject);
        });
    }

    static children(region) {

        return new Promise((resolve, reject) => {
            const url = Request.buildURL(Constants.RELATED_CHILD_URL, {
                app_token: APP_TOKEN,
                entity_id: region.id,
                limit: Constants.N_RELATIVES * 4
            });

            Request.getJSON(url).then(json => resolve(json), reject);
        });
    }

    static siblings(region) {
        return new Promise((resolve, reject) => {
            const url = Request.buildURL(Constants.RELATED_SIBLING_URL, {
                app_token: APP_TOKEN,
                entity_id: region.id,
                limit: Constants.N_RELATIVES * 4
            });

            Request.getJSON(url).then(json => resolve(json), reject);
        });
    }
}

module.exports = Relatives;
