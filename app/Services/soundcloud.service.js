"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var SoundCloudService = (function () {
    function SoundCloudService() {
        this.scPlayerStateSource = new BehaviorSubject_1.BehaviorSubject(2);
        this.scPlayerState$ = this.scPlayerStateSource.asObservable();
    }
    //Visual Studio Code gives error from SC. methods but still work as intended. It uses the script loaded in index.html
    SoundCloudService.prototype.setupPlayer = function () {
        SC.initialize({
            client_id: '18f08ce72fcb14af64a3bbcd03b4bcb1' });
    };
    SoundCloudService.prototype.playNewSong = function (song) {
        var _this = this;
        try {
            if (this.scPlayer != undefined) {
                this.scPlayer.dispose();
            }
            SC.stream('/tracks/' + song.song_url.toString())
                .then(function (player) {
                _this.scPlayer = player;
                _this.play();
                _this.scPlayer.on('finish', function () { return _this.scPlayerStateSource.next(0); });
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    SoundCloudService.prototype.play = function () {
        try {
            this.scPlayer.play();
            this.scPlayerStateSource.next(1);
        }
        catch (error) {
            console.log(error);
        } // 1 = playing
    };
    SoundCloudService.prototype.pause = function () {
        try {
            this.scPlayer.pause();
            this.scPlayerStateSource.next(2); // 2 = paused
        }
        catch (error) {
            console.log(error);
        }
    };
    SoundCloudService.prototype.togglePlay = function () {
        if (this.scPlayer._isPlaying == true) {
            this.pause();
        }
        else {
            this.play();
        }
    };
    SoundCloudService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SoundCloudService);
    return SoundCloudService;
}());
exports.SoundCloudService = SoundCloudService;
//# sourceMappingURL=soundcloud.service.js.map