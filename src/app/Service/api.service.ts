import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoint } from './endpoint.service';
import { environment } from '../environment/environment';

const domainUrl: string = environment.BaseUrl

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endPointObj = endPoint;

  constructor(private httpClient: HttpClient) { }

  getEndpointWithDomain(url: string = "") {
    return domainUrl + url;
  }

  getEndpointWithParams(endPoint: string = "", ...params: any[]) {
    let iteration = 0
    const urlWithParams = endPoint.replace(/:([a-zA-Z0-9]+)/g, (match, contents) => {
      if (params[iteration]) {
        contents = params[iteration]
        iteration++
      }
      return contents
    })
    return this.getEndpointWithDomain(urlWithParams);
  }

  //--------------------User-------------------//
  onLogin(data: any) {
    return this.httpClient.post(this.getEndpointWithDomain(this.endPointObj.authenticate.login), data)
  }

  // getUser() {
  //   return this.httpClient.get(this.getEndpointWithDomain(this.endPointObj.user.getUser))
  // }

  // getAllUsers(queryParams = {}) {
  //   return this.httpClient.get(this.getEndpointWithDomain(this.endPointObj.user.list), { params: queryParams })
  // }

  // deactivateUser(emailId: string) {
  //   return this.httpClient.delete(this.getEndpointWithParams(this.endPointObj.user.update, emailId))
  // }

  // activateUser(emailId: string) {
  //   return this.httpClient.patch(this.getEndpointWithParams(this.endPointObj.user.update, emailId), { shouldActivate: true })
  // }
}