(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        
        /*
        @desc album songs are being played from
        @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /*
        @desc Buzz object audio file
        @type {Object}
        */
        var currentBuzzObject = null;
        
        /*
        @function stopSong
        @desc Stops playing current song and sets to false
        @param {object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
        
        /*
        @function setSong
        @desc Stops currently playing song and loads new audio file as currentBuzzObject
        @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }
           
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
        };
        
        /*
        @function getSongIndex
        @desc returns index of song 
        @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /*
        @desc Currently playing song
        @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /*
        @function playSong
        @desc Playes a song and sets song.playing to true
        @param {object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
        /*
        @function SongPlayer.play
        @desc Checks to see if SongPlayer.currentSong is the same as the song put in. If it isn't it plays the passed in song and sets it to true. If it is the same and if it's paused it plays it.
        @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                
                setSong(song);
                playSong(song);
            
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /*
        @function SongPlayer.pause
        @desc It pauses the currently playing song and sets song.playing to false
        @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /*
        @function SongPlayer.previous
        @desc selects and plays the song previous to current song. If first in index it will stop playing the song and set currentsong.playing to null
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /*
        @function SongPlayer.next
        @desc plays the song after the currently playing one
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular 
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();