/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserResponseResultCustomModel } from '../../models/user-response-result-custom-model';

export interface ApiUserGetUserByIdGet$Json$Params {
  userId?: number;
}

export function apiUserGetUserByIdGet$Json(http: HttpClient, rootUrl: string, params?: ApiUserGetUserByIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponseResultCustomModel>> {
  const rb = new RequestBuilder(rootUrl, apiUserGetUserByIdGet$Json.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserResponseResultCustomModel>;
    })
  );
}

apiUserGetUserByIdGet$Json.PATH = '/api/User/GetUserById';