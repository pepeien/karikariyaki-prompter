import { HttpClient } from '@angular/common/http';

// Types
import {
	EventOrderRegistryApiV1,
	EventRegistryApiV1,
	OperatorAdminApiV1,
	OperatorRegistryApiV1,
	ProductRegistryApiV1,
} from '@types';

export class ApiV1 {
	private _client: HttpClient;

	constructor(client: HttpClient) {
		this._client = client;
	}

	public get eventRegistry() {
		return new EventRegistryApiV1(this._client);
	}

	public get eventOrderRegistry() {
		return new EventOrderRegistryApiV1(this._client);
	}

	public get operatorAdmin() {
		return new OperatorAdminApiV1(this._client);
	}

	public get operatorRegistry() {
		return new OperatorRegistryApiV1(this._client);
	}

	public get productRegistry() {
		return new ProductRegistryApiV1(this._client);
	}
}
