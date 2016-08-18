import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Playlist }       from '../Model/Playlist';
import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class DataService {
     private currentPlaylistSource = new Subject<Playlist>();
     currentPlaylist$ = this.currentPlaylistSource.asObservable();

     announceCurrentPlaylist(currentPlaylist: Playlist) {
        this.currentPlaylistSource.next(currentPlaylist);
     }
}