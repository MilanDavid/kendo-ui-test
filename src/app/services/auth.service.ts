import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(user) {
    const body = JSON.stringify(user);
    return this.httpClient.post('https://kendor-ui-test.azurewebsites.net/api/HttpTrigger1', body);
  }
}
