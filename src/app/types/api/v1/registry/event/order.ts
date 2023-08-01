import { Observable } from 'rxjs';
import { ApiResponseWrapper, QrCodeRseponse } from 'karikarihelper';

// Types
import { BaseApi } from '@types';

export class ApiV1EventOrderRegistry extends BaseApi {
    private _endpoint = `${this.root}/v1/admin/registry/event/order`;

    public status(): Observable<ApiResponseWrapper<string[]>> {
        const endpoint = new URL(this._endpoint + '/status');

        return this.client.get<ApiResponseWrapper<string[]>>(endpoint.href, {
            withCredentials: true,
        });
    }
}
