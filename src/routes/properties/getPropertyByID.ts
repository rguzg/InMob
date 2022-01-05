import type { Property } from "easybrokerapi"

export interface GetPropertyByIDResponse {body: Property, headers: null, status: number}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(id: string): Promise<GetPropertyByIDResponse> {

    if(typeof import.meta.env.VITE_EB_API_KEY != 'string'){
        throw new Error("VITE_EB_API_KEY is not defined");
    }

    if(typeof import.meta.env.VITE_BACKEND_URL != 'string'){
        throw new Error("VITE_BACKEND_URL is not defined");
    }

	const propertyList = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties/${id}`, {
        headers: {
            "authorization": import.meta.env.VITE_EB_API_KEY
        }
    });

	if (propertyList.ok) {
		return {
			body: 
				await propertyList.json(),
            status: 200,
            headers: null
		};
	} else {
        throw new Error;
    }
}