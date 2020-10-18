//funzione per caricare cookies specifici
class CookieManager {
    static getItem = (key: string): string | null => {
        const value = `; ${document.cookie}`.split(`; ${key}=`);
        if (value.length === 2)
            return value.pop()!!.split(';').shift() || null;
        return null;
    }
    static setItem = (key: string, value: any): void => {
        document.cookie = `${key}=${value}`;
    }
    static clear = (): void => {
        const cookies = document.cookie.split(';');
        cookies.forEach((c) => { 
            document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/'); 
        });
    }
    static removeItem = (key: string) : void=> {
        document.cookie = key + '=;expires=' + new Date().toUTCString() + ';path=/';
    }
}

export default CookieManager;