---
title: Plugin Quickstart
layout: docs
categories: ["Developers","Addons"]
---

<h1>A Quick-Start Guide to Writing Plugins for Vanilla</h1>
<h2>Getting Started</h2>
<p>The first thing you do when writing a plugin is create a folder for your plugin in the plugin directory named after the plugin. Inside the folder create a default.php file. Next, open the default.php file and add the plugin definition at the top, like this:</p>
<pre lang="php">// Define the plugin:
$PluginInfo['SamplePlugin'] = array(
   'Description' =&gt; 'This is a sample plugin.',
   'Version' =&gt; '1.0',
   'Author' =&gt; "Your Name",
   'AuthorEmail' =&gt; 'you@yourdomain.com',
   'AuthorUrl' =&gt; 'http://yourdomain.com'
);</pre>
<p>There are other definition settings you can provide, but this is the bare minimum you need to get started. To find out about all of the other definition settings, read the [[Plugins|complete plugin documentation]].</p>
<h2>Writing The Code</h2>
<p>There are many ways to approach writing a plugin in Vanilla, but there are the three methods you can use to "hook" into the Vanilla code: Custom Events, Magic Events, and Magic Methods.</p>
<h3>Custom Events</h3>
<p>Custom events are thrown at various places in the Vanilla code, and you can attach to them in order to perform some kind of action. For example, Vanilla fires a custom event called "DiscussionOptions" in the discussion list when the discussion option dropdown is being created. In order to attach to this event and add a new option, you could accomplish it with the following code:</p>
<pre lang="php">class SamplePlugin extends Gdn_Plugin {
    public function DiscussionsController_DiscussionOptions_Handler(&amp;$Sender) {
        $Sender-&gt;Options .= '&lt;li&gt;&lt;a href=""&gt;New Discussion Option&lt;/a&gt;&lt;/li&gt;';
    }
}</pre>
<p>The way the handler method is declared defines how and where it attaches. In this example, the "DiscussionsController" part of the method name tells the plugin manager to look in the DiscussionsController for the event handler we are attaching to. The "DiscussionOptions" part of the method name identifies the name of the event handler to attach to. Every event handler in Vanilla passes in the "Sender" as the first parameter, where the Sender is the object being attached to. In this example, the "Sender" is the DiscussionsController object. To put it simply, you can think of your event handler as a function that gets called exactly where the event handler is called. You can attach as many handlers to an event as you like. We are adding new event handlers all the time, and we are working on a Vanilla Developer plugin that will allow you to visually see on every page where there are events for you to attach to when that the developer plugin is enabled.</p>
<h3>Magic Events</h3>
<p>Vanilla has the ability to create what we've called "Magic Events". Magic events allow you to attach to custom events that fire when a method is called in the Vanilla code. At the time of this writing, there is only one method in Vanilla that fires Magic Events: the Controller class' "Render" method. The magic events that fire are:</p>
<ul>
<li>ObjectName_EventName_Before</li>
<li>ObjectName_EventName_Override</li>
<li>ObjectName_EventName_After</li>
</ul>
<p>These three magic events allow you to perform actions before and after the method gets called, as well as completely override the event if you wish. In the example of the base controller class' Render method, it means that you could choose any controller in any application and perform actions before, after, or instead of the default one. The Magic Events also have the ability to act as a wildcard by specifying "Base" instead of the ObjectName (ie. Base_Render_Before). This gives you the power to attach to a magic event any time any controller calls its render method. To summarize, here are a bunch of examples of the type of things you can do with Magic Events:</p>
<pre lang="php">class SamplePlugin extends Gdn_Plugin {
    public function DiscussionsController_Render_Before(&amp;$Sender) {
        // This method gets called before the Render method gets called on the DiscussionsController object.
    }

    public function PostController_Render_Override(&amp;$Sender) {
        // This method gets called in place of the PostController's Render method.
    }

    public function DraftsController_Render_After(&amp;$Sender) {
        // This method gets called after the Render method gets called on the DraftsController object.
    }

    public function Base_Render_Before(&amp;$Sender) {
        // This method gets called before the Render method gets called on every single class that
        // extends the Controller class (ie. every controller in every application).
    }
}</pre>
<h3>Magic Methods</h3>
<p>Finally, we come to magic methods. Imagine that there is an object in Vanilla that doesn't perform some task that you think is necessary. For example, what if I had created a UserController controller that only had methods to search for users, show users, and edit users. What if you wanted that controller to have a method to add a new user? That's where magic methods come into play. Magic methods in Vanilla essentially allow you to create new methods and add them to existing objects. They are created in much the same way that you attach to events. Using my UserController example, here is how I would create a Magic Method to add a new user:</p>
<pre lang="php">class SamplePlugin extends Gdn_Plugin {
   public function UserController_Add_Create(&amp;$Sender) {
        // I'd have some logic in here to save the user
        // Now I'll render a custom view I've created for this new method.<br />        // You'd want to have an file in plugins/SamplePlugin/views/adduser.php.<br />        $Sender-&gt;Render('AddUser', '', 'plugins/SamplePlugin');
   }
}</pre>
<p>In this example, we are attaching to the UserController object, defining an "Add" method, and using the special "Create" syntax so that the plugin manager knows to create our new method when someone attempts to call an "Add" method on the UserController object. That's it!</p>
<h2>More Information</h2>
<p>If you want more in-depth information on how to create plugins in Vanilla, here are some places you can go:</p>
<ul>
<li>[[Plugins|Detailed information about plugins]]</li>
<li><a href="http://www.vanillaforums.org/addon/example-plugin-1.0">Download an example plugin to help you get started</a></li>
<li><a href="../../addons">Download some plugins from the addon site and see how some functioning plugins work!</a></li>
<li><a href="../../discussions">Get some help in the developer community</a></li>
</ul>
