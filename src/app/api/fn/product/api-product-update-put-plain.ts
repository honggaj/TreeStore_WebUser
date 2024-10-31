/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateProductReponseResultCustomModel } from '../../models/update-product-reponse-result-custom-model';
import { UpdateProductRequest } from '../../models/update-product-request';

export interface ApiProductUpdatePut$Plain$Params {
      body?: UpdateProductRequest
}

export function apiProductUpdatePut$Plain(http: HttpClient, rootUrl: string, params?: ApiProductUpdatePut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateProductReponseResultCustomModel>> {
  const rb = new RequestBuilder(rootUrl, apiProductUpdatePut$Plain.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UpdateProductReponseResultCustomModel>;
    })
  );
}

apiProductUpdatePut$Plain.PATH = '/api/Product/Update';