---
title: Changelog
layout: page
categories: ["Developers"]
---

## Changelog

## 2.1.0

## 2.0.18

### 2.0.18
Major Features:

* Added moderation, bans, and delete/edit logging
* Added notifications (Growl-like popups)
* Added advanced category management
* Added IP logging to core
* Added Split/Merge plugin to core

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

## 2.0.17 (Released 2011-01-18)

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
