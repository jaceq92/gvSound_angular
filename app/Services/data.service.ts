import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Playlist, Song }       from '../Model/Playlist';
import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class DataService {
    
     private selectedPlaylistSource = new Subject<Playlist>();
     selectedPlaylist$ = this.selectedPlaylistSource.asObservable();

     private playingPlaylistSource = new Subject<Playlist>();
     playingPlaylist$ = this.playingPlaylistSource.asObservable();

     private currentSongSource = new Subject<Song>();
     currentSong$ = this.currentSongSource.asObservable();

     private playlistsSource = new Subject<Playlist[]>();
     playlists$ = this.playlistsSource.asObservable();

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
}