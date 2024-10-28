/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetListOrderSpResultListResultCustomModel } from '../../models/get-list-order-sp-result-list-result-custom-model';

export interface ApiOrderListOrderGet$Plain$Params {
}

export function apiOrderListOrderGet$Plain(http: HttpClient, rootUrl: string, params?: ApiOrderListOrderGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetListOrderSpResultListResultCustomModel>> {
  const rb = new RequestBuilder(rootUrl, apiOrderListOrderGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetListOrderSpResultListResultCustomModel>;
    })
  );
}

apiOrderListOrderGet$Plain.PATH = '/api/Order/ListOrder';
