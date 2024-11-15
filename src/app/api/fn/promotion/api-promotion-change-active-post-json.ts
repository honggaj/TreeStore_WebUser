/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BooleanResultCustomModel } from '../../models/boolean-result-custom-model';

export interface ApiPromotionChangeActivePost$Json$Params {
  promotionCode?: string;
}

export function apiPromotionChangeActivePost$Json(http: HttpClient, rootUrl: string, params?: ApiPromotionChangeActivePost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanResultCustomModel>> {
  const rb = new RequestBuilder(rootUrl, apiPromotionChangeActivePost$Json.PATH, 'post');
  if (params) {
    rb.query('promotionCode', params.promotionCode, {});
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

apiPromotionChangeActivePost$Json.PATH = '/api/Promotion/ChangeActive';
