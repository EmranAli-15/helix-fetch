export interface FetchOptions {
    headers?: Record<string, string>;
}

export interface MutationOptions extends FetchOptions {
    url: string;
    body?: any;
    method: "PATCH" | "PUT" | "DELETE" | "POST";
}

export class HelixFetch {
    baseURL: string;
    protected token?: () => string | null | undefined;
    protected cached: Record<string, any> = {};

    constructor({ baseURL = "", setToken }: { baseURL?: string, setToken?: (() => string | null | undefined) | any }) {
        this.baseURL = baseURL;
        this.token = setToken;
    }


    private getHeaders(customHeaders: Record<string, string> = {}) {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...customHeaders
        };

        const currentToken = this.token?.();
        if (currentToken) {
            headers['Authorization'] = currentToken;
        }

        return headers;
    }


    async query(url: string, options?: FetchOptions) {
        const fullurl = `${this.baseURL ? this.baseURL : ""}` + url;

        if (this.cached[fullurl]) {
            return {
                success: true,
                result: this.cached[fullurl]
            };
        }

        try {
            const response = await fetch(fullurl, {
                method: 'GET',
                headers: this.getHeaders(options?.headers)
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) throw new Error(result);

            this.cached[fullurl] = result;
            return { success: true, result };

        } catch (error: any) {
            return { success: false, error: error };
        }
    }


    async mutation({ url, body, method, headers }: MutationOptions) {
        const fullurl = `${this.baseURL ? this.baseURL : ""}` + url;

        try {
            const finalHeaders = this.getHeaders(headers);

            if (body instanceof FormData) {
                delete finalHeaders['Content-Type'];
            }

            const response = await fetch(fullurl, {
                method: method,
                headers: finalHeaders,
                body: body instanceof FormData ? body : JSON.stringify(body)
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) throw new Error(result);

            return { success: true, result };

        } catch (error: any) {
            return { success: false, error: error };
        }
    }
}