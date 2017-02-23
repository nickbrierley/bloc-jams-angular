(function() {
    function AlbumCtrl() {
        this.albumData = albumPat;
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();