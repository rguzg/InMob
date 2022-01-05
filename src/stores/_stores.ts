import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import EasyBrokerAPI from "easybrokerapi";

export const EasyBroker: Readable<EasyBrokerAPI> = readable(null, set => {
    if(typeof import.meta.env.VITE_EB_API_KEY == 'string'){
        set(new EasyBrokerAPI(import.meta.env.VITE_EB_API_KEY));        
    }
});