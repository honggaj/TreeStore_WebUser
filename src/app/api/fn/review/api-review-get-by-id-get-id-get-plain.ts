/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ReviewResponseResultCustomModel } from '../../models/review-response-result-custom-model';

export interface ApiReviewGetByIdGetIdGet$Plain$Params {
  reviewId?: number;
  GetId: string;
}

export function apiReviewGetByIdGetIdGet$Plain(http: HttpClient, rootUrl: string, params: ApiReviewGetByIdGetIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<ReviewResponseResultCustomModel>> {
  const rb = new RequestBuilder(rootUrl, apiReviewGetByIdGetIdGet$Plain.PATH, 'get');
  if (params) {
    rb.query('reviewId', params.reviewId, {});
    rb.path('GetId', params.GetId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ReviewResponseResultCustomModel>;
    })
  );
}

apiReviewGetByIdGetIdGet$Plain.PATH = '/api/Review/GetById/{GetId}';
