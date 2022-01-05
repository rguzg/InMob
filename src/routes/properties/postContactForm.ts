import type { ContactRequest } from "easybrokerapi"

export interface PostContactFormResponse {body: boolean, headers: null, status: number}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(contactRequest: ContactRequest): Promise<PostContactFormResponse> {

    if(typeof import.meta.env.VITE_EB_API_KEY != 'string'){
        throw new Error("VITE_EB_API_KEY is not defined");
    }

    if(typeof import.meta.env.VITE_BACKEND_URL != 'string'){
        throw new Error("VITE_BACKEND_URL is not defined");
    }

	const propertyList = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contactRequest`, {
        headers: {
            "authorization": import.meta.env.VITE_EB_API_KEY,
            "content-type": "application/json"
        },
        body: JSON.stringify(contactRequest),
        method: 'POST'
    });

	if (propertyList.ok) {
		return {
			body: true,
            status: 200,
            headers: null
		};
	} else {
        let errorMessage = await propertyList.json()
        throw new Error(errorMessage);
    }
}