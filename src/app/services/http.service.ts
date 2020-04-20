import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public userProfile;
  constructor(private httpClient: HttpClient,  private storage: StorageService) { }

  /**
   *
   * @param userData user Data
   */
  userLogin(userData) {
    return this.httpClient.post(`${URL.apiURL}/users/login`, userData);
  }


  getProfile() {
    const storageData = this.storage.getData('user');
    this.userProfile = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
    console.log('user', this.userProfile);
  }

  /**
   *
   * @param userData Updated profile data.
   */
  updateProfile(userData) {
    const header = new HttpHeaders({
      Authorization: `Token ${userData.user.token}`
    });
    return this.httpClient.put(`${URL.apiURL}/user`, userData, { headers: header } );
  }


  /**
   *
   * @param userData Updated profile data.
   */
  registerUser(userData) {
    return this.httpClient.post(`${URL.apiURL}/users`, userData);
  }

  getUserDetails(userData){
    const header = new HttpHeaders({
      Authorization: `Token ${userData}`
    });
    return this.httpClient.get(`${URL.apiURL}/user`, { headers: header } );
  }
}

