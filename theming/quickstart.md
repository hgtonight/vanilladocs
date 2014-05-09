---
title: Theming Quickstart
layout: page
categories: ["Theming"]
---

<h1>A Quick-Start Guide to Creating Themes for Vanilla</h1>
<p><strong>***Vanilla Forums Cloud Customers, check out our <a href="http://blog.vanillaforums.com/help/vanilla-forums-themes/">Ultimate Vanilla Forums Theme Guide</a>.***</strong></p>
<p>With Vanilla, you have full control over both the CSS and the actual HTML of every page in every application. The easiest thing for most designers is to just alter the CSS, so we'll start there:</p>
<h2>Part 1: CSS &amp; Design</h2>
<ol>
<li>Copy the /themes/default folder and rename it to your theme name so it sits in the root theme folder like this: /themes/your_theme_name.</li>
<li>Open the "about.php" file and edit the information to reflect your theme's information.</li>
<li>Create a custom.css file in the "design" folder of your custom theme.</li>
<li>Go to your Dashboard &gt; Themes, and apply your new theme.</li>
<li>Edit the custom.css file to your heart's content. The custom.css file is added *after* the base theme's css. Alternately, you can completely replace the base theme file (style.css) by copying it from the /applications/dashboard/design folder into your theme's design folder.</li>
</ol>
<h3>Other things you should know:</h3>
<ul>
<li>If you want to edit the look &amp; feel of the administrative screens, you can accomplish it by creating an admincustom.css file in your design folder.</li>
</ul>
<h2>Part 2: HTML &amp; Views</h2>
<p>If you don't like the way we've structured our Html, you can edit that too. Our pages are made up of two parts:</p>
<ol>
<li><strong>Master Views</strong>: These represent everything that wraps the main content of every page. If all you want to do is add a menu or banner above Vanilla, this is the only file you will need to alter. To do so, copy the default master view from /applications/dashboard/views/default.master.php to /themes/your_theme_name/views/default.master.php and edit it there.</li>
<li><strong>Views</strong>: These represent all of the content in each page. Every application has a "views" folder that contains all of the html for every page. So, for example, if you wanted to edit the html for the discussion list, you could copy the views from /applications/vanilla/views/discussions to /themes/your_theme_name/views/discussions and edit them there.</li>
</ol>
<h3>Other things you should know:</h3>
<ul>
<li>The administrative screens have their own master view. If you want to change their master view, copy the /applications/dashboard/views/admin.master.php file to /themes/your_theme_name/views/admin.master.php.</li>
</ul>
