"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixFetch = void 0;
class HelixFetch {
    baseURL = "";
    token;
    cached = {};
    constructor({ baseURL, setToken }) {
        this.baseURL = baseURL;
        this.token = setToken;
    }
    async query(url) {
        const fullurl = `${this.baseURL}${url}`;
        if (this.cached[fullurl])
            return {
                success: true,
                result: this.cached[fullurl]
            };
        else {
            try {
                const response = await fetch(fullurl, {
                    method: 'GET',
                    headers: {
                        'Authorization': this.token?.(),
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (!response.ok)
                    throw new Error(result.message);
                this.cached[fullurl] = result;
                return {
                    success: true,
                    result
                };
            }
            catch (error) {
                return {
                    success: false,
                    error
                };
            }
        }
    }
    async mutation({ url, data, method }) {
        const fullurl = `${this.baseURL}${url}`;
        try {
            const response = await fetch(fullurl, {
                method: method,
                headers: {
                    'Authorization': this.token?.(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok)
                throw new Error(result.message);
            this.cached[fullurl] = result;
            return {
                success: true,
                result
            };
        }
        catch (error) {
            return {
                success: false,
                error
            };
        }
    }
}
exports.HelixFetch = HelixFetch;
;
//# sourceMappingURL=index.js.map