/**
 * @since 2019-07-31 11:22
 * @author vivaxy
 */
var commentContainer = document.querySelector('.comment-container');
if (commentContainer) {
  var script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.crossorigin = 'anonymous';
  script.async = true;
  var attributes = {
    repo: 'vivaxyblog/vivaxyblog.github.io',
    'issue-term': 'pathname',
    label: 'blog-comment',
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'github-dark' : 'github-light',
  };
  Object.keys(attributes).forEach(function(key) {
    script.setAttribute(key, attributes[key]);
  });
  commentContainer.appendChild(script);
}
