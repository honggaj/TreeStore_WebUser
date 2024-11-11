/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RevenueResponseListResultCustomModel } from '../../models/revenue-response-list-result-custom-model';

export interface ApiOrderGetRevenueLast7DaysGet$Plain$Params {
}

export function apiOrderGetRevenueLast7DaysGet$Plain(http: HttpClient, rootUrl: string, params?: ApiOrderGetRevenueLast7DaysGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<RevenueResponseListResultCustomModel>> {
  const rb = new RequestBuilder(rootUrl, apiOrderGetRevenueLast7DaysGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RevenueResponseListResultCustomModel>;
    })
  );
}

apiOrderGetRevenueLast7DaysGet$Plain.PATH = '/api/Order/GetRevenueLast7Days';
