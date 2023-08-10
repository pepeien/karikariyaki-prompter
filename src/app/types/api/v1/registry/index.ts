import { HttpClient } from '@angular/common/http';

// Types
import {
    ApiV1EventOrderRegistry,
    ApiV1EventRegistry,
    ApiV1OperatorRegistry,
    ApiV1ProductRegistry,
} from '@types';

export class Registry {
    private _client: HttpClient;

    constructor(client: HttpClient) {
        this._client = client;
    }

    public get event() {
        return new ApiV1EventRegistry(this._client);
    }

    public get eventOrder() {
        return new ApiV1EventOrderRegistry(this._client);
    }

    public get operator() {
        return new ApiV1OperatorRegistry(this._client);
    }

    public get product() {
        return new ApiV1ProductRegistry(this._client);
    }
}
