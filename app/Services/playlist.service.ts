import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Song }           from '../Model/song';
import { Playlist }       from '../Model/Playlist';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlaylistService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
     private Url = 'http://localhost:15044/api/';

    getPlaylists() : Observable<Playlist[]> {
            return this.http.get(this.Url + "getplaylists/JSK")
                            // ...and calling .json() on the response to return data
                            .map((res:Response) => res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        }

     getPlaylist(id:number) : Observable<Song[]> {
         return this.http.get(this.Url + "getplaylist/JSK/" + id)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }
     
}