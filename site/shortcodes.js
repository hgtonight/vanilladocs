'use strict';

module.exports = [{
  tag: 'code-canvas'
, cb: function (buf, opts, templateData) {
    return '<div class="push">\n' + buf + '\n</div>';
  }
}];
