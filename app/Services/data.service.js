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
var Subject_1 = require('rxjs/Subject');
var DataService = (function () {
    function DataService() {
        this.selectedPlaylistSource = new Subject_1.Subject();
        this.selectedPlaylist$ = this.selectedPlaylistSource.asObservable();
        this.playingPlaylistSource = new Subject_1.Subject();
        this.playingPlaylist$ = this.playingPlaylistSource.asObservable();
        this.currentSongSource = new Subject_1.Subject();
        this.currentSong$ = this.currentSongSource.asObservable();
        this.playlistsSource = new Subject_1.Subject();
        this.playlists$ = this.playlistsSource.asObservable();
    }
    DataService.prototype.announceSelectedPlaylist = function (selectedPlaylist) {
        this.selectedPlaylistSource.next(selectedPlaylist);
    };
    DataService.prototype.announceCurrentSong = function (currentSong) {
        this.currentSongSource.next(currentSong);
    };
    DataService.prototype.announcePlayingPlaylist = function (playingPlaylist) {
        this.playingPlaylistSource.next(playingPlaylist);
    };
    DataService.prototype.announcePlaylists = function (playlists) {
        this.playlistsSource.next(playlists);
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map