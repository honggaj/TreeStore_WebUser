/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetListOrderByCustomerIdSpResultListResultCustomModel } from '../../models/get-list-order-by-customer-id-sp-result-list-result-custom-model';

export interface ApiOrderListOrderByCustomerIdGet$Json$Params {
  customerId?: number;
}

export function apiOrderListOrderByCustomerIdGet$Json(http: HttpClient, rootUrl: string, params?: ApiOrderListOrderByCustomerIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<GetListOrderByCustomerIdSpResultListResultCustomModel>> {
  const rb = new RequestBuilder(rootUrl, apiOrderListOrderByCustomerIdGet$Json.PATH, 'get');
  if (params) {
    rb.query('customerId', params.customerId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetListOrderByCustomerIdSpResultListResultCustomModel>;
    })
  );
}

apiOrderListOrderByCustomerIdGet$Json.PATH = '/api/Order/ListOrderByCustomerId';
