/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['user'];
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'form-login';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.submitForm = function () {
    var self = this;
    self._repository.findByCredentials(self.output)
        .then(function (data) {
            $.cookie("token",data["token"]);
            self.trigger('ev-body-init');
        })
        .catch(function (e) {
            var json = e.responseJSON || {};
            self.errors({password:json.error});
        });
};

ViewModel.prototype._compute = function () {
    this.output = {
        'password': this.input['password'],
        'username': this.input['username']
    };
    var self = this,
        fields = {
            'password': ko.observable(this.input['password']),
            'username': ko.observable(this.input['username']),
        },
        errors = {
            'password': ko.observable(this.input['password-error']),
            'username': ko.observable(this.input['username-error']),
        };
    fields['password'].subscribe(function (value) {
        self.output['password'] = value;
    });
    fields['username'].subscribe(function (value) {
        self.output['username'] = value;
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-form-login', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
