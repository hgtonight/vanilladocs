---
title: Dispatcher
layout: page
categories: ["Developers","Framework"]
---

<h1>Controllers &amp; Urls</h1>
<p>Controllers handle HTTP requests in Garden. A controller is simply a class file that extends the base controller class, and relates directly to the url being requested. Let's look at an example request in Garden:</p>
<pre>http://domain.com/default.php/garden/settings/configure</pre>
<p>And let's examine each part of the request: <strong>http://domain.com/default.php</strong>: As you saw in [[FolderStructure|Folder Structure]], the default.php file that handles all requests in Garden. <strong>/garden</strong>: The next part of the url is the application that is being requested. In this case, we are requesting the "garden" application within the application folder. <strong>/settings</strong>: The next part of the url is the controller that is being requested within the garden application. In this example, we are requesting a controller called "Settings". <strong>/configure</strong>: the final part of the url in this example is the method within the "Settings" controller that we are calling. In this example, we are calling <code>$SettingsController-&gt;Configure();</code>. If you were to map this request to the filesystem, it would be like this:</p>
<center><img class="Border" title="Request" src="http://markosullivan.ca/blog/wp-content/uploads/2008/11/fs-request.gif" alt="Request" width="441" height="642" /></center>
<p>I could take the same request and add information to the end, like this:</p>
<pre>http://domain.com/default.php/garden/settings/configure/arg1/arg2/argn</pre>
<p>And it would take any other parameters after the controller's configure method as if they are arguments being passed into that method. In other words, the above request would be essentially the same as calling that method like so:</p>
<pre>$SettingsController-&gt;Configure('arg1', 'arg2', 'argn');</pre>
<p>This can get pretty handy when doing things like paging through records, or specifying which user to load in a page. For example, to edit a user, the url would be:</p>
<pre>http://domain.com/default.php/garden/user/edit/mark</pre>
<p>Which would map to:</p>
<pre>$UserController-&gt;Edit('mark');</pre>
<h2>Analyzing the Request</h2>
<p>All requests are handled through the Dispatcher class. The dispatcher class looks at the request (everything after default.php) and tries to figure out the best way to handle it. As far as the dispatcher is concerned, in a perfect world the request would always include the application name, the controller name, and the method name. But in reality you might not always want all three items in your url. For example, you might want your application invisible to the user - so that, for example, a request to vanilla's discussion list goes to</p>
<pre>http://domain.com/default.php/discussions/all</pre>
<p>... instead of ...</p>
<pre>http://domain.com/default.php/vanilla/discussions/all</pre>
<p>Furthermore, you might want your controller's method hidden as well. So you could end up with something like:</p>
<pre>http://domain.com/default.php/discussions</pre>
<p>The dispatcher can handle all of these and a lot more. First of all, when no method is defined in the request, the dispatcher assumes that you are calling the "index" method of the controller. So, a request to:</p>
<pre>http://domain.com/default.php/vanilla/discussions</pre>
<p>... is the same as calling ...</p>
<pre>$DiscussionsController-&gt;Index();</pre>
<p>Furthermore, when the dispatcher gets a request that doesn't include the application name, it starts to look through all of the enabled applications for the requested controller name. As soon as it finds one, it records it's mapping in the cache folder and calls it appropriately. There is the possibility that two different applications could have the same controller name, and in that case, it would return the first application's controller that it found. Probably the nicest thing about this method of handling requests is that a 6-line .htaccess file:</p>
<pre>   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^(.*)$ default.php/$1 [QSA,L]
</pre>
<p>... allows you to remove the default.php from the url and makes all requests look like this:</p>
<pre>http://domain.com/application/controller/method</pre>
<p>Or, in it's simplest form:</p>
<pre>http://domain.com/controller</pre>