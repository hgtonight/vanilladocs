---
title: Views
layout: page
categories: ["Developers","Framework"]
---

<h1>Views</h1>
<p>Once a controller method is called to handle the request, how is the xhtml of the page put together? <strong>Views</strong>. There are two types of views in Garden: "Views" and "Master Views". A view relates directly to the controller method that called it and handles rendering content related to that request. You can typically think of a view as the content for that page. For example, if a Vanilla-&gt;Discussion-&gt;All() method is called, the view for that method would handle rendering all of the discussions. Everything that is rendered around the discussions is handled by the Master View. The Master View allows you to create a consistent layout for the pages in the application. A single master view defines the look and feel and standard behavior for all of the pages (or a group of pages) in the application. Let's go back to the filesystem so you can get a better picture. In the following example, the request in the url would have been: <code>http://myserver.com/garden/profile/index/mark</code> So, this means that Garden's "Profile" controller was requested, the "index" method was requested from the profile controller, and the first argument into the index method is "mark". In other words, the request was: <code>$ProfileController-&gt;Index('mark');</code></p>
<center><img class="Border" title="Views" src="http://markosullivan.ca/blog/wp-content/uploads/2008/12/fs-views.gif" alt="Views" width="417" height="687" /></center>
<p>Let's take a look at the profile controller's index method:</p>
<pre lang="php">public function Index($UserReference = '') {
   $UserModel = new UserModel();
   $this-&gt;User = $UserModel-&gt;GetByReference($UserReference);
   $this-&gt;Render();
}</pre>
<p>Simply put, the index method grabs some data that can be later used in the profile controller's "index" view, and then calls the Render() method. The Render method is defined on the base Controller class; the class from which all controllers are extended. The Render method performs the following tasks:</p>
<ol>
<li>Finds and fetches the view.</li>
<li>Finds and fetches the css for the view.</li>
<li>Finds and renders the master view.</li>
</ol>
<p>In the most simple example, the view will be as it appears in the image above: in a "profile" folder within the "views" folder, and named after the method that was called: <code>/views/profile/index.php</code>. By default, the controller will fetch that view from the context of the FetchView method of the base controller class. In plain-English: the view file is included within a method on the Controller class called "FetchView". That is why I placed the user data within a $this-&gt;User property in my $ProfileController-&gt;Index() method, above; so it could be accessible from within my view file. The view file likely will contain something as simple as this:</p>
<h3>Basic Information</h3>
<dl class="Info"><dt>Joined</dt><dd><!--?php echo $this--->User-&gt;DateFirstVisit; ?&gt;</dd><dt>Visits&gt;/dt&gt;</dt><dd><!--?php echo $this--->User-&gt;CountVisits; ?&gt;</dd><dt>Last Active</dt></dl>
<p>Once the view is fetched, it is added to an asset collection. By default it is added to the "Content" asset collection. The rest of the page (the "Frame" of the page) is handled by the master view. By default, the "default.master" master view is used unless another master view is specified. In the image above you can see that there are a few different master views available in the Garden application: default, email, error, and setup. The css files for each of those master views are named accordingly, as well. So, the default.master view has a default.screen.css file, the error.master view has an error.screen.css file, etc. Again, in the most simple of examples, the master view is located in the "view" folder of the application, and the related css files are located in the "design" folder of that application. Here is what the default.master view looks like:</p>
<pre lang="php">


	<!--?php $this--->RenderAsset('Head'); ?&gt;$BodyIdentifier, 'class' =&gt; $this-&gt;CssClass)); ?&gt;&gt;</pre>
<p>As you can see, the master view handles the basic structure of a page. As I mentioned above, by default the view that is fetched by the controller is added to an asset collection called "Content", and that asset collection is rendered in this master view when the <code>$this-&gt;RenderAsset('Content')</code>method is called - right there in the middle of the master view. As you can see in the master view above, there are a number of different asset collections available for application and plugin authors (Head, Menu, Content, and Foot). An application author has the ability to add as many of these as he/she desires and add to them as necessary. The idea behind these asset collections is that while the basic request can be handled and placed into the "Content" asset (ie. the profile information being displayed from the example above), there are still a lot of other elements a person may want on a page. Plugin authors may want to add assets to the head, menu, or foot. They may even want to add assets to the content collection. Garden itself has other UI components that get rendered in the head and menu asset collections (which will be discussed in a later preview). So, in the most basic example, the "index" view is requested from it's controller's view folder, the default.screen.css file is requested from the application's design folder, and the master view is requested from the root of the application's "view" folder. What other ways could the views and css have been retrieved? The controller uses Garden's FileSystem object to search the application for the appropriate file to handle the request. Whatever the filesystem object finds first, it will use.</p>
<h3>Views are retrieved with the following precedence:</h3>
<ol>
<li><strong>An explicitly defined path to a view.</strong> ie. a plugin's custom view location</li>
<li><strong>Application-specific theme view.</strong> ie. /path/to/garden/themes/theme_name/app_name/views/controller_name/view.php</li>
<li><strong>Garden-wide theme view.</strong> ie. /path/to/garden/themes/theme_name/views/controller_name/view.php</li>
<li><strong>Application default.</strong> ie. /path/to/garden/applications/app_name/views/controller_name/view.php</li>
</ol>
<h3>Master views are retrieved with the following precedence:</h3>
<ol>
<li><strong>Application-specific theme view.</strong> ie. /path/to/garden/themes/theme_name/app_name/views/default.master</li>
<li><strong>Garden-wide theme view.</strong> ie. /path/to/garden/themes/theme_name/views/default.master</li>
<li><strong>Application default.</strong> ie. /path/to/garden/applications/app_name/views/default.master</li>
<li><strong>Garden default.</strong> ie. /path/to/garden/applications/garden/views/default.master</li>
</ol>
<h3>CSS files are retrieved with the following precedence:</h3>
<ol>
<li><strong>Application-specific css.</strong> ie. /path/to/garden/themes/theme_name/app_name/design/default.screen.css</li>
<li><strong>Garden-wide theme view.</strong> ie. /path/to/garden/themes/theme_name/design/default.screen.css</li>
<li><strong>Application default.</strong> ie. /path/to/garden/applications/app_name/design/default.screen.css</li>
<li><strong>Garden default.</strong> ie. /path/to/garden/applications/garden/design/default.screen.css</li>
</ol>
<p>You might be wondering things like: can I change the view or master view that handles my request on the fly? Of course you can! Everything in Garden was written so that you have total control over what comes out on the other end. In my example above, I could change my views on the fly with something like this:</p>
<pre lang="php">public function Index($UserReference = '') {
   $UserModel = new UserModel();
   $this-&gt;User = $UserModel-&gt;GetByReference($UserReference);
   $this-&gt;View = "somethingelse"; // Use /views/profile/somethingelse.php to handle the content
   // ... or ...
   $this-&gt;View = "/some/other/view.php"; // Use some custom view to handle the content
   $this-&gt;MasterView = "setup"; // Use the setup master view to render my contents
   $this-&gt;Render();
}</pre>
<p>Views are a lot to take in, and they certainly might be daunting upon first read. But I can guarantee that I have found them to be utterly simple and flexible to use. Think of the possibilities you can accomplish with views! You could create a master view that handles rendering of RSS feeds. You could port your request method to use your RSS master and render all of your contents with a custom RSS view. You could grab the email master view and send out your content to some email address(es) before rendering. You could bypass the rendering altogether and deliver json data. The possibilities are endless, and that is the real power of views.</p>