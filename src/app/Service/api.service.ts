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


  getAllEmailTemplate(queryParams: any) {
    return this.httpClient.get(this.getEndpointWithDomain(this.endPointObj.channels.list), { params: queryParams });
  }
  createEmailTemplate(data: any) {
    return this.httpClient.post(this.getEndpointWithDomain(this.endPointObj.channels.list), data);
  }
  getTemplateByCode(templateCode: string) {
    const url = this.getEndpointWithDomain(this.endPointObj.channels.editTemplate);
    return this.httpClient.get(url, {params: {templateCode}});
  }
  updateTemplateById(id: string, data: any) {
    const url = this.getEndpointWithParams(this.endPointObj.channels.updateTemplate, id);

    // Log the URL and ID for debugging
    console.log('URL:', url);
    console.log('ID:', id);

    return this.httpClient.put(url, data);
  }
  // In api.service.ts
deleteEmailTemplate(id: string) {
  const url = `${this.getEndpointWithDomain(this.endPointObj.channels.deleteTemplate)}/${id}`;
  return this.httpClient.delete(url); // Use DELETE method
}


}
