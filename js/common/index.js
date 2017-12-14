/**
 * @since 14/12/2017 14:28
 * @author vivaxy
 */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
        }, function(err) {
            // registration failed :(
        });
    });
}
