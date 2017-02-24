(function() {
    function SongPlayer() {
        var SongPlayer = {};
        /*
        @desc Currently playing song
        @type {Object}
        */
        var currentSong = null;
        /*
        @desc Buzz object audio file
        @type {Object}
        */
        var currentBuzzObject = null;
        
        /*
        @function setSong
        @desc Stops currently playing song and loads new audio file as currentBuzzObject
        @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
           
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentSong = song;
        };
        
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
        @desc Checks to see if currentSong is the same as the song put in. If it isn't it plays the passed in song and sets it to true. If it is the same and if it's paused it plays it.
        @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                
                setSong(song);
                playSong(song);
            
            } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular 
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();