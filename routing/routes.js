blog.app.config( [ '$routeProvider', '$locationProvider',
    function( $routeProvider, $locationProvider ) {

        $locationProvider.html5Mode( true );

        $routeProvider
            .when( '/', {
                controller: 'home',
                templateUrl: '/routing/home/home.html'
            })
            .when( '/post/:post', {
                controller: 'post',
                templateUrl: '/routing/post/post.html'
            })
            .when( '/private/create', {
                controller: 'create',
                templateUrl: '/routing/create/create.html'
            });
    }
]);