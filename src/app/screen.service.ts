import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ScreenService {

  constructor(private http: HttpClient) {
  }

  getScreens(): Observable<any> {
    return this.http.get('http://localhost:8080/screen-service/screens');
  }

  getScreen(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/screen-service/screens/' + id);
  }

  updateScreen(screen: {id: string, content: string}): Observable<any> {
    return this.http.post('http://localhost:8080/screen-service/screens/', screen);
  }


}
