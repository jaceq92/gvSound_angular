import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Song }           from '../Model/song';
import { Playlist }       from '../Model/Playlist';
import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';


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
     getYoutubeSearchResults(keyword:string) : Observable<Song[]>{
         return this.http.get(this.Url + "searchyoutube/" + keyword)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }
     addSong (body: Song, username:string, playlist_id:number): Promise<Song> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({headers: headers }); // Create a request option

        return this.http.post(this.Url + "insertsong/" + username + "/" + playlist_id, body, options).toPromise() // ...using post request
                         .then((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
     
}