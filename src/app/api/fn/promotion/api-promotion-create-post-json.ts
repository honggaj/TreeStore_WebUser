/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BooleanResultCustomModel } from '../../models/boolean-result-custom-model';
import { PromotionRequest } from '../../models/promotion-request';

export interface ApiPromotionCreatePost$Json$Params {
      body?: PromotionRequest
}

export function apiPromotionCreatePost$Json(http: HttpClient, rootUrl: string, params?: ApiPromotionCreatePost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanResultCustomModel>> {
  const rb = new RequestBuilder(rootUrl, apiPromotionCreatePost$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BooleanResultCustomModel>;
    })
  );
}

apiPromotionCreatePost$Json.PATH = '/api/Promotion/Create';