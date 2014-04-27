---
title: Locales
layout: page
categories: ["Developers","Locales"]
---


## Translating Vanilla

Want to help us improve our translations? We have a [Transifex project](https://www.transifex.com/projects/p/vanilla/) for contributing to this. Create an account there and submit your improvements.

Please make sure that your changes use generic terminology and good grammar that can apply to all forums and avoids interest- or region-specific terms.

Need to customize the phrasing on your site in particular? See "Overriding locales" below.

## Installing locales

1. Download the locale you want from the [Addon Directory](http://vanillaforums.org/addon/browse/locales/popular/2).
2. Upload the folder to your `locales` folder.
3. In the Dashboard, go to `Addons > Locales`.
4. Enable the locale.
5. Change the Default Locale at the top of the page, and Save.

## Using multiple locales

The [Multilingual plugin](http://vanillaforums.org/addon/multilingual-plugin) allows each user select their preference from all enabled locales.

## Overriding locales

You can override your default locale by adding a `conf/locale.php` file to your installation with additional definitions. Any definitions in this file will override your locale. The contents of the file should look like this:

     <?php if (!defined('APPLICATION')) exit();
     
	 // Note about what you're translating
     $Definition['TranslationString1'] = "Override String 1";
     $Definition['TranslationString2'] = "Override String 2";
     
     // More stuff
     $Definition['TranslationString3'] = "Override String 3";
     $Definition['TranslationString4'] = "Override String 4";

If you duplicate an entry's translation string, the latter one will take precedence. You can, however, assign the same override string to mulptiple translation strings.

If you are using Multilingual to enable multiple locales, please note his override will effect **all** locales. There is currently no way to override multiple locales selectively.