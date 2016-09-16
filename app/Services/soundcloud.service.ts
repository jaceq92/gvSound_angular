declare var SC: any;

import { Injectable } from '@angular/core';
import { Song } from '../Model/playlist';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SoundCloudService {
	constructor() {}
	public scPlayer: any;
	private scPlayerStateSource = new BehaviorSubject<number>(2);
    scPlayerState$ = this.scPlayerStateSource.asObservable();

	setupPlayer(){
		SC.initialize({
			client_id: '18f08ce72fcb14af64a3bbcd03b4bcb1'});
	}

    playNewSong(song: Song) {
		if (this.scPlayer != undefined){
			this.scPlayer.dispose();
		}

		SC.stream('/tracks/' + song.song_url.toString())
				.then(player => {
					this.scPlayer = player;
					if (this.scPlayer.options.protocols[0] === 'rtmp') {
        				this.scPlayer.options.protocols.splice(0, 1);
    				}
					this.play();
					this.scPlayer.on('finish', () => this.scPlayerStateSource.next(0));
				});
	}

	play() {
		this.scPlayer.play();
        this.scPlayerStateSource.next(1); // 1 = playing
	}

	pause() {
		this.scPlayer.pause();
        this.scPlayerStateSource.next(2); // 2 = paused
	}

	togglePlay(){
		if (this.scPlayer._isPlaying == true){
			this.pause();
		} else{
			this.play();
		}
	}
}