'use strict';

const Constants = {

    APP_TOKEN: 'cQovpGcdUT1CSzgYk0KPYdAI0',

    AUTOCOMPLETE_MAX_OPTIONS: 100,
    AUTOCOMPLETE_SEPARATOR: ':',
    AUTOCOMPLETE_SHOWN_OPTIONS: 5,
    AUTOCOMPLETE_URL: type => `http://api.opendatanetwork.com/suggest/v1/${type}`,
    AUTOCOMPLETE_WAIT_MS: 150,

    PEER_REGIONS: 5,
    PEER_REGIONS_MAX: 10,

    REGION_NAMES: {
        nation: 'Nation',
        region: 'US Census Region',
        division: 'US Census Division',
        state: 'US State',
        county: 'US County',
        msa: 'Metropolitan Statistical Area',
        place: 'City',
        zip_code: 'ZIP Code'
    },

    ROSTER_URL: 'https://federal.demo.socrata.com/resource/bdeb-mf9k.json',
};

if (typeof module !== 'undefined') module.exports = Constants;
