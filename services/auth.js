blog.app.factory('auth', [ '$timeout', '$firebaseSimpleLogin', function( $timeout, $firebaseSimpleLogin ) {


    var authObj = new Firebase( blog.fbRoot );
    var fbAuth = new FirebaseSimpleLogin( authObj, function( error, user ) {

        if ( error ){
            $timeout(function() {
                pub.user = null;
            });

        }

        else if ( user ){
            $timeout(function() {
                pub.user = user;
            });
        }

        else{
            $timeout(function() {
                pub.user = null;
            });

        }

    });

    var pub = {

        login: function( user ) {
            fbAuth.login( 'password', {
                email: user.email,
                password: user.password,
                rememberMe: true
            });
        },

        logout: function() {
            fbAuth.logout();
        },

        user: null
    };

    return pub;

}]);