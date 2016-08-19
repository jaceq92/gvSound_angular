export class Playlist {
  playlist_id: number;
  playlist_name: string;
  deletable: boolean;
  songs: Song[];
}

export class Song {
  id: number;
  title:string;
  song_artist: string;
  song_name: string;
  song_url: string;
  song_added: Date;
  username: string;
}