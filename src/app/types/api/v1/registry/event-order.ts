import { Observable } from 'rxjs';
import { ApiResponseWrapper } from 'karikarihelper';

// Types
import { BaseApi } from '@types';

export class EventOrderRegistryApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/event/order`;

	public status(): Observable<ApiResponseWrapper<string[]>> {
		const endpoint = new URL(this._endpoint + '/status');

		return this.client.get<ApiResponseWrapper<string[]>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
