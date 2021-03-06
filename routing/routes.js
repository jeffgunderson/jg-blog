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
            .when( '/edit/:post', {
                controller: 'edit',
                templateUrl: '/routing/edit/edit.html'
            })
            .when( '/private/create', {
                controller: 'create',
                templateUrl: '/routing/create/create.html'
            })
            .when( '/private/login', {
                controller: 'login',
                templateUrl: '/routing/login/login.html'
            });

    }
]);