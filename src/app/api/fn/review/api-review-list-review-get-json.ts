/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ReviewResponseListResultCustomModel } from '../../models/review-response-list-result-custom-model';

export interface ApiReviewListReviewGet$Json$Params {
}

export function apiReviewListReviewGet$Json(http: HttpClient, rootUrl: string, params?: ApiReviewListReviewGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<ReviewResponseListResultCustomModel>> {
  const rb = new RequestBuilder(rootUrl, apiReviewListReviewGet$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ReviewResponseListResultCustomModel>;
    })
  );
}

apiReviewListReviewGet$Json.PATH = '/api/Review/ListReview';