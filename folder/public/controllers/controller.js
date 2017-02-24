var app = angular.module('MusicLibraryApp', []);

app.controller('AppCtrl', function($scope, $http) {
    $scope.itemPerPage = 5;
    $scope.currentPage = 1;
    $scope.val = false;
    $scope.NewValue = {};
    $scope.NewSong = '';
    $scope.a = {};

    $scope.prev = function() {
        $scope.currentPage = $scope.currentPage - 1;
    };

    $scope.next = function() {
        $scope.currentPage = $scope.currentPage + 1;
    };


    console.log("Hello from the Controller");
    var refresh = function() {
        $http.get('/MusicLibrary').then(function(response) {
            console.log("I got the data I requested");
            $scope.Music = response.data;
            var size = $scope.Music.length;

            $scope.MusicLibrary = "";
            // $scope.numberOfPages = Math.round($scope.contactlist.length / $scope.itemPerPage);
        });
    };

    refresh();

    $scope.addSong = function() {
        console.log($scope.value);
        if (!$scope.value || !$scope.value.Album || !$scope.value.Artist || !$scope.value.Song) {
            alert("Please enter the details");
        } else {
            $http.post('/MusicLibrary', $scope.value).then(function(response) {
                $scope.value = {};
                refresh();
            });
        }


    };

    $scope.addMore = function() {
        if (!$scope.NewSong){
            alert("Please enter the details");
        }
        else
        {
        $scope.val = false;
        var newValue = {
            Album: $scope.NewValue.Album,
            Artist: $scope.NewValue.Artist,
            Song: $scope.NewSong
        }        
        $http.post('/MusicLibrary', newValue).then(function(response) {            
            refresh();
        });
    }
    };

    $scope.ShowAddSong = function(value) {
        $scope.val = true;
        $scope.NewValue = value;
        console.log(value);
    };

    $scope.cancel = function() {
        $scope.val = false;
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/MusicLibrary/' + id).then(function(response) {
            refresh();
        });
    };


    $scope.edit = function(id) {
        console.log(id);
        $http.get('/MusicLibrary/' + id).then(function(response) {
            $scope.value = response.data;
            console.log($scope.value);
        });
    };

    $scope.updateSong = function(id) {
        console.log($scope.value._id);
        console.log($scope.value);
        $http.put('/MusicLibrary/' + $scope.value._id, $scope.value).then(function(response) {
            refresh();
        });
    };

    $scope.deselect = function() {
        $scope.value = {};
    };

});

app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start;
        return input.slice(start);

    }
});