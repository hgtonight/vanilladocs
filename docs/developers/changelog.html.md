---
title: Changelog
layout: page
categories: ["Developers"]
---

# Open Source Change Log

2.1
===

### 2.1.0

*[Released 28 April 2014](http://vanillaforums.org/discussion/26685/vanilla-2-1-stable-released)*

Vanilla internals were completely revamped for 2.1. Many views and several plugin hooks were changed, so **themes and plugins must be tested** and may need to be refactored before upgrading.

* Better localization support.
* Improved embedding.
* Performance and caching enhancements.
* Revamped Activity structure.
* Framework improvements.
* Hundreds of bug fixes.

Incremental changelogs from the [first 2.1 beta](http://vanillaforums.org/discussion/23322/vanilla-2-1b1-released) thru RC1 can be found in their individual release announcements:

* [Beta 2](http://vanillaforums.org/discussion/24845/vanilla-2-1b2-released)
* [Beta 3](http://vanillaforums.org/discussion/26518/vanillla-2-1-beta-3)
* [Release Candidate 1](http://vanillaforums.org/discussion/26626/vanilla-2-1-release-candidate)

2.0.18
===

### 2.0.18.11  
*[Released 21 Apr 2014](http://vanillaforums.org/discussion/26627/vanilla-2-0-18-11-security-release)*

* 3 security patches.
* Ditches troublesome "Remove" option on the plugins page.

### 2.0.18.10
*[Released 21 Dec 2013](http://vanillaforums.org/discussion/25668/dec-2013-security-update-2-0-18-10-and-2-1b2)*

* Removes flawed update checker.

### 2.0.18.9
*[Released 26 Nov 2013](http://vanillaforums.org/discussion/25458/security-update-vanilla-2-0-18-9)*

* Use SafeRedirect() instead of Redirect() in the discussion controller.
* Added TrustedDomains() and SafeRedirect().
* Don't allow user id override on post.
* Fix Flagging security flaw
* Filter discussion title on categories/all
* Comment notifications should only be sent to people with the "NewComment" preference set.
* Twitter: Change api version to 1.1.
* Tagging: Fix xss bug in tagging.
* Do not add linebreaks twice on search.

### 2.0.18.8
*[Released 4 Apr 2013](http://vanillaforums.org/discussion/23339/security-update-vanilla-2-0-18-8)*

* Call & check for FilterForm() properly.

### 2.0.18.7

* Disable the ability to call functions in escaped SQL strings.

### 2.0.18.6

* Switch update checks to json to prevent object injection hacks.

### 2.0.18.5

* Prevent object injection hacks.
* Make sure the admin password is hashed when inserting the admin user on an already installed Vanilla.
* Fix Facebook plugin for the 5 Dec 2012 Facebook update.
* Add class attributes for all the menu item elements.
* Cache-control logic improvements.
* Add the proper username parameter to profile/edit.
* Filter activity, discussion, and comment forms.
* Fixed security hole where on profile/picture and profile/preferences. Allow moderators to change users' pictures from the profile page.
* Added joomla password hashing.

### 2.0.18.4
*[Released 26 Mar 2012](http://vanillaforums.org/discussion/19542/vanilla-2-0-18-4-released)*

* Patch form tampering possibility.
* Fix canonical URL issues.

### 2.0.18.3
*[Released 5 Mar 2012](http://vanillaforums.org/discussion/19285/security-vulnerability-flagging-plugin-2-0-18-2-and-earlier)*

* Flagging plugin security fixes.

### 2.0.18.2
*[Released 21 Jan 2012](http://vanillaforums.org/discussion/18749/vanilla-2-0-18-2-release)*

* Fixed bug where Gravatar was using name instead of email for Vanillicons.
* vBulletin import improvements.
* SSO fixed for non-English.
* Embed improvements.
* Tagging fix.
* Fix malformed install screen.
* Various other bug fixes.

### 2.0.18.1
*[Released 7 Nov 2011](http://vanillaforums.org/discussion/17643/vanilla-2-0-18-final-release)*

* Fixed bug in the Twitter plugin.
* Fixed some bugs with connecting.
* Prevent too many "photo changed" activities.
* Added the ability to include announcements in the /categories/discussions page.
* Fix so people with custom domains don't see strange text.
* Fixes mass-approve/deny for Applicants
* Correct title on /categories pages
* Fixed jQuery syntax errors.

### 2.0.18
*[Released 3 Nov 2011](http://vanillaforums.org/discussion/17643/vanilla-2-0-18-final-release)*

Major Features:

* Added moderation, bans, and delete/edit logging.
* Added notifications (Growl-like popups).
* Added advanced category management.
* Added IP logging to core.
* Added Split/Merge plugin to core.

Changes:

* Added ability to chain Vanillicons into Gravatars with C(Plugins.Gravatar.UseVanillicons) = TRUE
* Added ability to use IE targetting for CSS and JS files
* Disabled CLEditor for IE6 users
* Disabled popups in IE7 or less
* Added Session support, see: Gdn_Session()->Stash()
* Turns off Embed by default
* Added WebOS to mobile user agents

Fixes:

* Fixed bug in 2.0.17 that could (on rare occassion) wipe your config.php file
* Fixed issue that could cause VanillaStats to stop working
* Many new translatable strings added or fixed
* Fixed support for PHP 5.2 on Windows (fnmatch)
* Fixed profile to not ask for old password if one was never set (via SSO)
* Fixed hundreds of other bugs too numerous to list, including dozens of SQL-related bugs.

2.0.17
===

### 2.0.17.10
SECURITY: Fixed Facebook, Twitter, and Embed plugins' access control.
### 2.0.17.9
SECURITY: Fixed cookie theft vulnerability.
### 2.0.17.8
Fixed a packaging problem that caused the contents of index.php to be duplicated
### 2.0.17.7
Updated analytics client and server software to fix a bug in stats transmission and rendering
### 2.0.17.6
SECURITY: Fixed potential querystring XSS and cookie HMAC Timing vulnerabilities in core
### 2.0.17.5
Fixed problem with category permissions where some configurations would result in too restrictive defaults
### 2.0.17.4
Fixed problem with dashboard structure file where Activity and Profile permissions were not granted automatically on fresh install
### 2.0.17.3
Repackaged distribution without OS-Specific meta data, and fixed ajax information exposure bug
### 2.0.17.2
Fixed bug where analytics registration would occur repeatedly if config file was read-only
### 2.0.17.1
Fixed bug where analytics hooked before Garden.Installed=true, causing a fatal error on install
### 2.0.17
*Released 2011-01-18*

* Fixed bug where plugins and themes could fail to enable due to extra whitespace.
* Fixed bug where search results were not properly sorted by date after relevance.
* Fixed bug where links in profile status cause the profile to clear when clicked.
* Fixed bug where signing in from the comment form button would not refresh the page.
* Fixed bug where administrators could not change user's picture without 404 errors.
* Fixed bug where stack trace would display when testing plugins, even if not in DEBUG mode.
* Fixed bug where signin would not properly redirect if javascript was disabled.
* Fixed bug where editing a role was erroneously selecting the default permission in the UI when editing.
* Fixed bug where discussion autorefresh would sometimes disable itself.
* Fixed bug where when markdown is enabled urls would not get auto-converted to clickable links.
* Fixed bugs in OpenID and GoogleSignIn where redirect targets were not getting sent to the signin.
* Fixed bug where mobile theme would sometimes display incorrect "last comment date".
* Optimized Announced Discussions query to improve performance.

Older Releases
===
*Unlisted versions were skipped or replaced the same day.*

* 2.0.16 - 2010-12-02
* 2.0.15 - 2010-11-25
* 2.0.14 - 2010-11-09
* 2.0.13 - 2010-10-27
* 2.0.11 - 2010-10-06
* 2.0.10 - 2010-09-30
* 2.0.9 - 2010-09-15
* 2.0.6 - 2010-09-01
* 2.0.3 - 2010-08-11
* 2.0.1 - 2010-08-04
* 2.0.0 - 2010-07-22
* 1.1.10 - 2009-11-23
* 1.1.9 - 2009-09-10
* 1.1.8 - 2009-08-02
