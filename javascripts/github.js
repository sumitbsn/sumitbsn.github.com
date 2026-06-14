var github = (function(){
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+(repos[i].description||'')+'</p></li>';
    }
    t.innerHTML = fragment;
  }
  return {
    showRepos: function(options){
      var url = "https://api.github.com/users/"+options.user+"/repos?per_page=100&sort=updated";
      var headers = {};
      
      // Add GitHub token if available (for higher rate limits)
      if (options.token) {
        headers['Authorization'] = 'token ' + options.token;
      }
      
      fetch(url, { headers: headers })
        .then(function(response) {
          if (!response.ok) {
            throw new Error('GitHub API error: ' + response.status);
          }
          return response.json();
        })
        .then(function(data) {
          var repos = [];
          if (!Array.isArray(data)) { 
            console.error('Unexpected API response:', data);
            return; 
          }
          for (var i = 0; i < data.length; i++) {
            if (options.skip_forks && data[i].fork) { continue; }
            repos.push(data[i]);
          }
          repos.sort(function(a, b) {
            var aDate = new Date(a.pushed_at).valueOf(),
                bDate = new Date(b.pushed_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        })
        .catch(function(error) {
          console.error('Error loading repos:', error);
          var target = $(options.target);
          if (target.find('li.loading').length) {
            target.find('li.loading').addClass('error').text("Error loading feed");
          } else {
            target.html('<li class="error">Error loading feed</li>');
          }
        });
    }
  };
})();
