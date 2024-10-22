import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  sidebarData = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {
    this.sidebarData.next('sucribe');
  }

  getSidebarData() {
    return this.sidebarData.asObservable();
  }
  /**
   * Fetch data from the API
   * @param path
   * @param data
   * @returns  Observable<any> - An observable that contains the API response
   */
  postData(path: string, data: any): Observable<any> {
    let requestOptions: any = {
      observe: 'response',
      withCredentials: false,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(path, data, requestOptions);
  }

  /**
   *getData data from the API
   * @param path
   * @param payload
   * @returns  Observable<any> - An observable that contains the API response
   */
  getData(path: string, payload: any = {}): Observable<any> {
    let params = new HttpParams();
    params = payload ? params.appendAll(payload) : params;
    console.log('params-->', params);
    return this.http.get(path, { params, withCredentials: false });
  }

  /**
   *delete data from the API
   * @param path
   * @param id
   * @returns  Observable<any> - An observable that contains the API response
   */
  delete(path: string, id: string): Observable<any> {
    return this.http.delete(`${path + '/' + id} `);
  }

  /**
   *Update data from the API
   * @param path
   * @param data
   * @returns  Observable<any> - An observable that contains the API response
   */
  putData(path: string, data: any = {}): Observable<any> {
    return this.http.put(path, data);
  }
}
