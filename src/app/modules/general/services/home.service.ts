import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from  'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) { }

    getData(url) {
        return this.http.get(url)
            .pipe(
                map((respData) => respData)
            );
    }

}
