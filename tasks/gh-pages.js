function getDeployMessage() {
  var ret = '\n\n';

  if (process.env.TRAVIS !== 'true') {
    ret += 'missing env vars for travis-ci';

    return ret;
  }

  ret += 'Branch:       ' + process.env.TRAVIS_BRANCH + '\n';
  ret += 'SHA:          ' + process.env.TRAVIS_COMMIT + '\n';
  ret += 'Range SHA:    ' + process.env.TRAVIS_COMMIT_RANGE + '\n';
  ret += 'Build ID:     ' + process.env.TRAVIS_BUILD_ID  + '\n';
  ret += 'Build number: ' + process.env.TRAVIS_BUILD_NUMBER + '\n';

  return ret;
}

module.exports = {
  options: {
    user: {
      name: 'Todd Burry'
    , email: 'todd@vanillaforums.com'
    }
  , base: 'dist'
  , repo: 'https://' + process.env.GH_OAUTH_TOKEN + '@github.com/' + process.env.GH_OWNER + '/' + process.env.GH_PROJECT_NAME + '.git'
  , silent: true
  , message: 'Publish gh-pages (auto)' + getDeployMessage()
  }
, src: '**/*'
};
