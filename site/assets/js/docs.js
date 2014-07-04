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

    $.ajax({
      url: '/search.json'
    })
    .done(function (data) {
      $.each(data.docs, function (i, doc) {
        // Decode the URL encoded content
        doc.content = decodeURI(doc.content);

        index.add(doc);
        pages.push(doc);
      });

      cache.set('docs', {
        pages: pages
      , index: index
      }, 24 * 60 * 60 * 1000); // Expire after a day
    });
  }

  var searchHandler = function (e) {
    var $input   = $(e.currentTarget)
      , $search  = $('.js-search')
      , $results = $('.js-search-results')
      , matches  = []
      , query    = $input.val();

    index.search(query).map(function (match) {
      $.each(pages, function (i, page) {
        if (page.url === match.ref) {
          matches.push(page);
        }
      });
    });

    matches = matches.slice(0, 5);

    if (matches.length) {
      output = '';

      $.each(matches, function (i, match) {
        output += [
          '<li>',
            '<a href="' + match.url + '">',
              '<span class="title">' + match.title + '</span>',
              '<span class="categories">' + match.categories.join(' / ') + '</span>',
            '</a>',
          '</li>'
        ].join('');
      });

      $results.html(output);
      $search.addClass('open');
    }
    else {
      $results.empty();
      $search.removeClass('open');
    }
  };

  $(document).on('input', '.js-search-input', searchHandler);

  var $docsNav  = $('.js-docs-nav')
    , $footer   = $('.js-footer')
    , $panelCol = $docsNav.parent();

  $panelCol.css('min-height', $docsNav.outerHeight(true));

  if ($(window).outerHeight() < $footer.position().top) {
    $docsNav.affix({
      offset: {
        top: function () {
          return (this.top = $docsNav.offset().top - 30);
        }
      , bottom: function () {
          return (this.bottom = $footer.outerHeight(true));
        }
      }
    });
  }

})(jQuery, window, document);
