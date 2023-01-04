import { CONTENTFUL_DELIVERY_API_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from '$env/static/private';
import contentful from 'contentful';

export const contentfulClient = contentful.createClient({
	space: CONTENTFUL_SPACE_ID,
	accessToken: CONTENTFUL_DELIVERY_API_ACCESS_TOKEN
});
