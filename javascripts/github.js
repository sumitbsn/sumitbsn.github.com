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
      fetch("https://api.github.com/users/"+options.user+"/repos")
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(function(data) {
          var repos = [];
          if (!data) { return; }
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
          console.error('Error:', error);
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
