blog.app.factory( 'postService', [ '$firebase', function( $firebase ) {

    var postRef = new Firebase( blog.fbRoot ).child( 'posts' ),
        postsListRef = new Firebase( blog.fbRoot ).child( 'postsList' );

    var pub = {

        createPost: function( data ) {
            postRef.child( data.permalink ).push( data, function() {
                postsListRef.push({
                    title: data.title,
                    date: data.date,
                    permalink: data.permalink
                })
            } );
        },

        posts: function() {
            return $firebase( postsListRef ).$asArray();
        },

        getPost: function( key ) {
            console.log( key );
            return $firebase( postRef.child( key ) ).$asArray();
        }

    };

    return pub;

}]);