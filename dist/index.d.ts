export declare class HelixFetch {
    baseURL: any;
    protected token?: (() => any) | null | undefined;
    protected cached: any;
    constructor({ baseURL, setToken }: {
        baseURL?: string;
        setToken?: (() => any) | null | undefined;
    });
    query(url: string): Promise<{
        success: boolean;
        result: any;
        error?: never;
    } | {
        result?: never;
        success: boolean;
        error: any;
    }>;
    mutation({ url, data, method }: {
        url: string;
        data?: any;
        method: "PATCH" | "PUT" | "DELETE" | "POST";
    }): Promise<{
        error?: never;
        success: boolean;
        result: any;
    } | {
        result?: never;
        success: boolean;
        error: any;
    }>;
}
//# sourceMappingURL=index.d.ts.map