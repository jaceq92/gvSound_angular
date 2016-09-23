import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Playlist, Song }       from '../Model/Playlist';
import { User } from '../Model/User';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DataService {
    
     private Url = '/api/';
     constructor (private http: Http) {}

     private selectedPlaylistSource = new Subject<Playlist>();
     selectedPlaylist$ = this.selectedPlaylistSource.asObservable();

     private playingPlaylistSource = new Subject<Playlist>();
     playingPlaylist$ = this.playingPlaylistSource.asObservable();

     private currentSongSource = new Subject<Song>();
     currentSong$ = this.currentSongSource.asObservable();

     private playlistsSource = new Subject<Playlist[]>();
     playlists$ = this.playlistsSource.asObservable();

     private userSource = new Subject<User>();
     user$ = this.userSource.asObservable();

     private errorSource = new Subject<any>();
     error$ = this.errorSource.asObservable();

     private successSource = new Subject<any>();
     success$ = this.successSource.asObservable();

     private shuffleSource = new Subject<boolean>();
     shuffle$ = this.shuffleSource.asObservable();

     announceSelectedPlaylist(selectedPlaylist: Playlist) {
        this.selectedPlaylistSource.next(selectedPlaylist);
     }
     announceCurrentSong(currentSong: Song){
         this.currentSongSource.next(currentSong);
     }
     announcePlayingPlaylist(playingPlaylist: Playlist){
         this.playingPlaylistSource.next(playingPlaylist);
     }
     announcePlaylists(playlists: Playlist[]){
         this.playlistsSource.next(playlists);
     }
     announceUser(user: User){
         this.userSource.next(user);
     }
     announceError(error: string){
         this.errorSource.next(error);
     }
     announceSuccess(success: string){
         this.successSource.next(success);
     }

     announceShuffle(shuffleState: boolean){
         this.shuffleSource.next(shuffleState);
     }

     authUser(body: User): Promise<any> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({headers: headers }); // Create a request option

        return this.http.put(this.Url + "auth", body, options).toPromise()
                         .then(response => { 
                             localStorage.setItem("token", response.text());
                             localStorage.setItem("username", body.username);
                             body.token = response.text();
                             this.announceUser(body);
                        }) 
                         .catch(response => {this.announceError(response.text())});
    }
}