


blog.app.directive('createPost', [ 'postService', function( postService ) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/modules/posts/create-post.html',
        link: function( $scope ) {

            $scope.createPost = function() {

                // add a date
                $scope.postData.date = new Date().toString();

                // save it
                postService.createPost( $scope.postData );

                // clear the data so we can write another.. maybe forward to post instead
                $scope.postData = {};

            }

        }
    }
}]);

blog.app.directive('editPost', [ '$route', 'postService', function( $route, postService ) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/modules/posts/edit-post.html',
        link: function( $scope ) {

            var postParam = $route.current.params.post;
            $scope.postData = postService.getPost( postParam );

            $scope.updatePost = function() {

                var data = {
                    title: $scope.postData.title,
                    post: $scope.postData.post,
                    permalink: $scope.postData.permalink
                }

                postService.updatePost( data );
            }

        }
    }
}]);

blog.app.directive('posts', [ 'postService', 'auth', function( postService, auth ) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/modules/posts/posts-list.html',
        link: function( $scope ) {

            $scope.posts = postService.posts();
            $scope.auth = auth;

        }
    }
}]);

blog.app.directive('post', [ '$route', '$timeout', 'postService', function( $route, $timeout, postService ) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/modules/posts/post.html',
        link: function( $scope, $element, $attrs ) {

            var postParam = $route.current.params.post;
            $scope.post = postService.getPost( postParam );

            $timeout(function() {
                prettyPrint();
            }, 200 );

        }
    }
}]);


//TODO: these can probably be moved into a filters file

/**
 * Changes the string saved in the DB to an object for Angular to handle
 */
blog.app.filter( 'dateStringToObject', function () {
    return function ( date ) {

        return new Date( date );

    };
});


/**
 * Reverses the results from firebase so newest shows up first in UI
 */
blog.app.filter('reverse', function() {
    function toArray(list) {
        var k, out = [];
        if( list ) {
            if( angular.isArray(list) ) {
                out = list;
            }
            else if( typeof(list) === 'object' ) {
                for (k in list) {
                    if (list.hasOwnProperty(k)) { out.push(list[k]); }
                }
            }
        }
        return out;
    }
    return function(items) {
        return toArray(items).slice().reverse();
    };
});