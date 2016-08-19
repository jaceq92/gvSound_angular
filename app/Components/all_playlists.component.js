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
var data_service_1 = require('../Services/data.service');
var add_playlist_component_1 = require('../Components/add_playlist.component');
var angular2_contextmenu_1 = require('angular2-contextmenu/angular2-contextmenu');
var ng2_toasty_1 = require('ng2-toasty/ng2-toasty');
var PlaylistsComponent = (function () {
    function PlaylistsComponent(playlistService, dataService, contextMenuService, toastyService) {
        var _this = this;
        this.playlistService = playlistService;
        this.dataService = dataService;
        this.contextMenuService = contextMenuService;
        this.toastyService = toastyService;
        this.playlists = [];
        this.dataService.playlists$.subscribe(function (playlists) { _this.playlists = playlists; });
    }
    PlaylistsComponent.prototype.onSelect = function (playlist) {
        this.selectedPlaylist = playlist;
        this.dataService.announceSelectedPlaylist(this.selectedPlaylist);
    };
    PlaylistsComponent.prototype.ngOnInit = function () {
        this.getPlaylists();
    };
    PlaylistsComponent.prototype.ngOnChanges = function (changes) {
        if (changes['playerHidden'] != undefined) {
            this.playerHidden = changes['playerHidden'].currentValue;
            if (this.playerHidden == true) {
                this.height = "75vh";
            }
            else {
                this.height = "35vh";
            }
        }
    };
    PlaylistsComponent.prototype.onLoaded = function () {
        this.selectedPlaylist = this.playlists[0];
        this.dataService.announceSelectedPlaylist(this.playlists[0]);
    };
    PlaylistsComponent.prototype.getPlaylists = function () {
        var _this = this;
        this.playlistService.getPlaylists().subscribe(function (playlists) {
            _this.playlists = playlists;
            _this.onLoaded();
            _this.dataService.announcePlaylists(_this.playlists);
        });
    };
    PlaylistsComponent.prototype.showAddPlaylistModal = function () {
        this.addPlaylist.showAddPlaylistModal();
    };
    PlaylistsComponent.prototype.onContextMenu = function ($event, item) {
        var _this = this;
        this.contextMenuService.show.next({
            actions: [
                {
                    html: function () { return "Delete " + item.playlist_name; },
                    click: function (item) {
                        if (item.deletable == false) {
                            _this.addToast("error", "Error", "This Playlist cannot be deleted");
                        }
                        else {
                            _this.playlistService.deletePlaylist(item.playlist_id, "JSK").then(function (res) {
                                _this.addToast("success", "Playlist deleted!", item.playlist_name);
                                _this.playlists.splice(_this.playlists.indexOf(item), 1);
                                _this.dataService.announcePlaylists(_this.playlists);
                            }, function (error) {
                                _this.addToast("error", "Error", "Playlist delete failed, try again!");
                            });
                        }
                    },
                },
            ],
            event: $event,
            item: item,
        });
        $event.preventDefault();
    };
    PlaylistsComponent.prototype.addToast = function (type, title, message) {
        var toastOptions = {
            title: title,
            msg: message,
            showClose: false,
            timeout: 5000,
            theme: 'bootstrap'
        };
        if (type == "success") {
            this.toastyService.success(toastOptions);
        }
        if (type == "error") {
            this.toastyService.error(toastOptions);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PlaylistsComponent.prototype, "playerHidden", void 0);
    __decorate([
        core_1.ViewChild(add_playlist_component_1.AddPlaylistComponent), 
        __metadata('design:type', add_playlist_component_1.AddPlaylistComponent)
    ], PlaylistsComponent.prototype, "addPlaylist", void 0);
    PlaylistsComponent = __decorate([
        core_1.Component({
            selector: 'all-playlists',
            templateUrl: 'app/Components/all_playlists.component.html',
            styleUrls: ['app/Components/all_playlists.component.css'],
            providers: [playlist_service_1.PlaylistService, angular2_contextmenu_1.ContextMenuService],
            directives: [add_playlist_component_1.AddPlaylistComponent, angular2_contextmenu_1.ContextMenuComponent, ng2_toasty_1.Toasty]
        }), 
        __metadata('design:paramtypes', [playlist_service_1.PlaylistService, data_service_1.DataService, angular2_contextmenu_1.ContextMenuService, ng2_toasty_1.ToastyService])
    ], PlaylistsComponent);
    return PlaylistsComponent;
}());
exports.PlaylistsComponent = PlaylistsComponent;
//# sourceMappingURL=all_playlists.component.js.map