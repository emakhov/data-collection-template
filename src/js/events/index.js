/*jslint node: true, nomen: true */
"use strict";

exports.createEvents = function (options) {
    return {
        'ev-auth-failure': require('./auth/ev-auth-failure').createEvent(options)
        ,'ev-auth-success': require('./auth/ev-auth-success').createEvent(options)
        ,'ev-body-init' : require('./auth/ev-body-init').createEvent(options)
        ,'ev-logout-success': require('./auth/ev-logout-success').createEvent(options)
        ,'ev-edit-campaign': require('./campaign/ev-edit-campaign').createEvent(options)
        ,'ev-logout': require('./auth/ev-logout').createEvent(options)
        ,'ev-edit-account': require('./auth/ev-edit-account').createEvent(options)
        ,'ev-list-task-selected': require('./task/ev-list-task-selected').createEvent(options)
        ,'ev-task-session': require('./task/ev-task-session').createEvent(options)
        ,'ev-to-upload-image': require('./image/ev-to-upload-image').createEvent(options)
        ,'ev-to-image-statistic': require('./image/ev-to-image-statistic').createEvent(options)
        ,'ev-image-selected': require('./image/ev-image-selected').createEvent(options)
        ,'ev-list-worker': require('./worker/ev-list-worker').createEvent(options)
        ,'ev-create-new-campaign': require('./campaign/ev-create-new-campaign').createEvent(options)
        ,'ev-list-campaign-selected': require('./campaign/ev-list-campaign-selected').createEvent(options)
        ,'ev-campaign-images': require('./image/ev-campaign-images').createEvent(options)
        ,'ev-campaign-workers': require('./worker/ev-campaign-workers').createEvent(options)
        ,'ev-register-success': require('./auth/ev-register-success').createEvent(options)
    };
};
