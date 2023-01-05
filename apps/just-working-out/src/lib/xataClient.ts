// Generated by Xata Codegen 0.21.0. Please do not edit.
import { XATA_API_KEY } from '$env/static/private';
import type { BaseClientOptions } from '@xata.io/client';
import { DatabaseClient, tables, type DatabaseSchema } from './xata';

const defaultOptions = {
	databaseURL: 'https://Bhekani-Khumalo-s-workspace-sem5mg.eu-west-1.xata.sh/db/just-working-out',
	apiKey: XATA_API_KEY
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
	constructor(options?: BaseClientOptions) {
		super({ ...defaultOptions, ...options }, tables);
	}
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
	if (instance) return instance;

	instance = new XataClient();
	return instance;
};