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
var playlist_service_1 = require('../Services/playlist.service');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var playlist_1 = require('../Model/playlist');
var youtube_service_1 = require('../Services/youtube.service');
var PlaylistComponent = (function () {
    function PlaylistComponent(playlistService, youtubeService) {
        var _this = this;
        this.playlistService = playlistService;
        this.youtubeService = youtubeService;
        this.playlist = [];
        this.subscription = this.youtubeService.state$.subscribe(function (state) {
            _this.state = state;
            if (state == 0) {
                _this.indexOfNextSong = _this.playlist.indexOf(_this.selectedSong) + 1;
                _this.youtubeService.playSong(_this.playlist[_this.indexOfNextSong].song_url);
                _this.selectedSong = _this.playlist[_this.indexOfNextSong];
            }
        });
    }
    PlaylistComponent.prototype.onSelect = function (song) {
        this.selectedSong = song;
        this.youtubeService.playSong(this.selectedSong.song_url);
    };
    PlaylistComponent.prototype.ngOnChanges = function (changes) {
        if (changes['currentPlaylist'] != undefined) {
            this.currentPlaylist = changes['currentPlaylist'].currentValue;
            if (this.currentPlaylist != undefined) {
                this.getPlaylist(this.currentPlaylist.playlist_id);
            }
        }
    };
    PlaylistComponent.prototype.getPlaylist = function (id) {
        var _this = this;
        this.playlistService.getPlaylist(id).subscribe(function (playlist) {
            _this.playlist = playlist;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', playlist_1.Playlist)
    ], PlaylistComponent.prototype, "currentPlaylist", void 0);
    PlaylistComponent = __decorate([
        core_1.Component({
            selector: 'single-playlist',
            templateUrl: 'app/Components/single_playlist.component.html',
            styleUrls: ['app/Components/single_playlist.component.css'],
            directives: [ng2_dnd_1.DND_DIRECTIVES],
            providers: [playlist_service_1.PlaylistService, ng2_dnd_1.DND_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [playlist_service_1.PlaylistService, youtube_service_1.YoutubeService])
    ], PlaylistComponent);
    return PlaylistComponent;
}());
exports.PlaylistComponent = PlaylistComponent;
//# sourceMappingURL=single_playlist.component.js.map