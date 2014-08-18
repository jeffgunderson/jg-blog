blog.app.factory( 'postService', [ '$firebase', function( $firebase ) {

    var postRef = new Firebase( blog.fbRoot ).child( 'posts' ),
        postsListRef = new Firebase( blog.fbRoot ).child( 'postsList' );

    var pub = {

        createPost: function( data ) {

            postRef.child( data.permalink ).set( data, function() {
                postsListRef.child( data.permalink ).set({
                    title: data.title,
                    date: data.date,
                    permalink: data.permalink
                })
            } );
        },

        updatePost: function( data ) {

            postRef.child( data.permalink ).update( data, function() {
                postsListRef.child( data.permalink).update({
                    title: data.title,
                    permalink: data.permalink
                })
            } );

        },

        posts: function() {
            return $firebase( postsListRef ).$asArray();
        },

        getPost: function( key ) {
            return $firebase( postRef.child( key ) ).$asObject();
        }

    };

    return pub;

}]);