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
var PlaylistsComponent = (function () {
    function PlaylistsComponent(playlistService) {
        this.playlistService = playlistService;
        this.playlists = [];
        this.currentPlaylist = new core_1.EventEmitter();
    }
    PlaylistsComponent.prototype.onSelect = function (playlist) {
        this.selectedPlaylist = playlist;
        this.currentPlaylist.emit(this.selectedPlaylist);
    };
    PlaylistsComponent.prototype.ngOnInit = function () {
        this.getPlaylists();
    };
    PlaylistsComponent.prototype.onLoaded = function () {
        this.selectedPlaylist = this.playlists[0];
        this.currentPlaylist.emit(this.playlists[0]);
    };
    PlaylistsComponent.prototype.getPlaylists = function () {
        var _this = this;
        this.playlistService.getPlaylists().subscribe(function (playlists) {
            _this.playlists = playlists;
            _this.onLoaded();
        });
    };
    PlaylistsComponent = __decorate([
        core_1.Component({
            selector: 'all-playlists',
            templateUrl: 'app/Components/all_playlists.component.html',
            styleUrls: ['app/Components/all_playlists.component.css'],
            providers: [playlist_service_1.PlaylistService],
            outputs: ['currentPlaylist']
        }), 
        __metadata('design:paramtypes', [playlist_service_1.PlaylistService])
    ], PlaylistsComponent);
    return PlaylistsComponent;
}());
exports.PlaylistsComponent = PlaylistsComponent;
//# sourceMappingURL=all_playlists.component.js.map