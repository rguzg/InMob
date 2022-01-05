import type { StatusOptions, PropertyList } from "easybrokerapi"

export interface GetPropertyListResponse {body: PropertyList, headers: null, status: number}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(page: number = 1, limit: number = 15, options: StatusOptions[]): Promise<GetPropertyListResponse> {

    if(typeof import.meta.env.VITE_EB_API_KEY != 'string'){
        throw new Error("VITE_EB_API_KEY is not defined");
    }

    if(typeof import.meta.env.VITE_BACKEND_URL != 'string'){
        throw new Error("VITE_BACKEND_URL is not defined");
    }

	const propertyList = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties?page=${page}&limit=${limit}&options=${JSON.stringify(options)}`, {
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