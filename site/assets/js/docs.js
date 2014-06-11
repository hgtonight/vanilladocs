;(function ($, window, document, undefined) {

  var cache = {
    set: function (key, val, exp) {
      store.set(key, {
        val  : val
      , exp  : exp
      , time : new Date().getTime()
      });
    }
  , get: function (key) {
      var info = store.get(key);

      if (!info) {
        return null;
      }

      if (new Date().getTime() - info.time > info.exp) {
        return null;
      }

      return info.val;
    }
  };

  var docs  = cache.get('docs')
    , pages = []
    , index;

  if (docs) {
    pages = docs.pages;
    index = lunr.Index.load(docs.index);
  }
  else {
    index = lunr(function () {
      this.field('title', 10);
      this.field('categories', 5);
      this.field('content');
      this.ref('url');
    });

    oboe('/search.json')
      .node('docs.*', function (result) {
        // Decode the URL encoded content
        result.content = decodeURI(result.content);

        index.add(result);
        pages.push(result);
      })
      .done(function () {
        cache.set('docs', {
          pages: pages
        , index: index
        }, 24 * 60 * 60 * 1000); // Expire after a day
      });
  }

  var search = new Vue({
    el: '#search-docs'
  , data: {
      results: []
    }
  , computed: {
      hasResults: function () {
        return this.results.length;
      }
    }
  , methods: {
      search: function (e) {
        var matches = []
          , query   = $(e.target).val();

        index.search(query).map(function (match) {
          $.each(pages, function (index, page) {
            if (page.url === match.ref) {
              matches.push(page);
	    }
          });
        });

        // Grab the first 5 results
        matches = matches.slice(0, 5);

        this.results = matches;
      }
    }
  });

  var $docsNav  = $('.js-docs-nav')
    , $panelCol = $docsNav.parent();

  $panelCol.css('min-height', $docsNav.outerHeight(true));

  $docsNav.affix({
    offset: {
      top: function () {
        return (this.top = $docsNav.offset().top - 30);
      }
    , bottom: function () {
        return (this.bottom = $('.js-footer').outerHeight(true));
      }
    }
  });

})(jQuery, window, document);
