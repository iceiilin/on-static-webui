// Copyright 2015, EMC, Inc.

import axios from 'axios';

export default class Requester {

    constructor(baseUrl) {
        this.$ = axios.create({
            baseURL: baseUrl || ''
        });
    }

    get(url, config) {
        return this.$.get(url, config || {});
    }

    put(url, data, config) {
        return this.$.put(url, data, config || {});
    }

    post(url, data, config) {
        return this.$.delete(url, data, config || {});
    }

    delete(url, config) {
        return this.$.delete(url, config || {});
    }
}
