import CookieManager from "./CookieManager";

class APIWorker {
    private static makeRequest = (method: string, endpoint: string, formData: FormData | undefined): Promise<Response> => {
        const requestPromise = fetch(
            process.env.REACT_APP_API_URL + endpoint,
            {
                method: method,
                body: formData,
                mode: 'cors',
                headers: [
                    ['X-Authentication', CookieManager.getItem('session') || '']
                ]
            }
        );

        return requestPromise;
    } 

    static post = (endpoint: string, formData: FormData ) => {
        //return false if endpoint is empty
        if(!endpoint || endpoint === '' || endpoint === '/') {
            return false;
        }

        //return the promise response
        return APIWorker.makeRequest(
            'POST',
            endpoint,
            formData
        );
    }
    static get = (endpoint: string) => {
        //se endpoint è vuoto ritorno false
        if(!endpoint || endpoint === '' || endpoint === '/') {
            return false;
        }

        //ritorno promise della richiesta
        return APIWorker.makeRequest(
            'GET',
            endpoint,
            undefined
        );
    }
}
export default APIWorker;