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
		try {
		if (this.scPlayer != undefined){
			this.scPlayer.dispose();
		}
		SC.stream('/tracks/' + song.song_url.toString())
				.then( player => {
					this.scPlayer = player;
					this.play();
					this.scPlayer.on('finish', () => this.scPlayerStateSource.next(0));
				});
	}
	catch(error){
		console.log(error);
		}
	}

	play() {
		try{
		this.scPlayer.play();
        this.scPlayerStateSource.next(1);
		}catch(error){
			console.log(error)
		} // 1 = playing
	}

	pause() {
		try{
		this.scPlayer.pause();
        this.scPlayerStateSource.next(2); // 2 = paused
		}catch(error){
			console.log(error)
		}
	}

	togglePlay(){
		if (this.scPlayer._isPlaying == true){
			this.pause();
		} else{
			this.play();
		}
	}
}