/**
 * @since 2017-05-08 11:02:18
 * @author vivaxy
 */

document.addEventListener('turbolinks:before-render', function(event) {
    DISQUS.reset();
});
