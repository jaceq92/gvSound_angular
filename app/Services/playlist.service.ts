import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Playlist, Song }  from '../Model/Playlist';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';


// Import RxJs required methods


@Injectable()
export class PlaylistService {
     constructor (private http: Http) {}
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
     getSoundCloudSearchResults(keyword:string) : Observable<Song[]>{
         return this.http.get(this.Url + "searchsoundcloud/" + keyword)
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
                         .catch(this.handleError); //...errors if any
    }

    deleteSong(song_id:number): Promise<number>{
        return this.http.delete(this.Url + "deletesong/" + song_id).toPromise() // ...using post request
                         .then((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch(this.handleError); //...errors if any
    }
    insertPlaylist(body:Playlist, username:string): Promise<Playlist>{
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options    = new RequestOptions({headers: headers }); // Create a request option
        
        return this.http.post(this.Url + "insertplaylist/" + username, body, options).toPromise()
                         .then((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch(this.handleError); //...errors if any
    }
    deletePlaylist(playlist_id:number, username:string): Promise<String>{
        return this.http.delete(this.Url + "deleteplaylist/" + username + "/" + playlist_id + "/").toPromise() // ...using post request
                         .then((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch(this.handleError); //...errors if any
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
        }
}