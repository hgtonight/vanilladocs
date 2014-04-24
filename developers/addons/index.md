---
title: Addons
layout: page
categories: ["Developers","Addons"]
---

<h2>Plugins</h2>
<p>Before development on Garden began, I spent a lot of time <a href="http://markosullivan.ca/blog/?p=77">thinking about</a> how to improve upon the plugin architecture adopted for Vanilla 1, and then I spent even more time doing <a href="http://markosullivan.ca/blog/?p=206">test after test after test</a> to see what really worked. In the end I realized that there can easily be more than one way to accomplish the task, so I've adopted a few standards, and I've left the code open to new methods of plugging in that some of you may decide to pursue. For now, I'll talk about four different ways of plugging in.</p>
<h2>1. Custom Events</h2>
<p>Any class that extends the class "Pluggable" has the ability to call <code>$this-&gt;FireEvent('EventName')</code>, and then plugins can attach to that event to perform some kind of operation. There should be no surprises here. There is a PluginManager class that picks up any defined plugins in the bootstrapper file (the file that includes core classes, defines constants, defines configuration settings, etc), and when the FireEvent method is called, it references the PluginManager class to see if there are any plugins that want to attach to the event name being fired. Of course it passes along some extra information that may be useful to the plugins as well:</p>
<pre lang="php">public function FireEvent($EventName) {
  // Look to the PluginManager to see if there are related 
  // event handlers and call them:
  $this-&gt;PluginManager-&gt;CallEventHandlers(
     $this, 
     $this-&gt;ClassName, 
     $EventName, 
     $this-&gt;EventArguments
  );
}</pre>
<p>Custom events are being added on a case-by-case basis as the need arises. If you feel you need a new Event, request it on the community forum. However, you should also consider if you could use...</p>
<h2>2. Magic Events</h2>
<p>Magic events are new in Garden, and they are based around some trickery I've come up with using PHP's magic <a href="http://ca.php.net/__call">__call</a> method. For those of you who don't know what PHP's __call method does, here is a quick breakdown: When you attempt to call a method on an object that does not have that method (PHP refers to these as "inaccessible methods"), the __call method is fired as: <code>$Object-&gt;__call($Name, $Arguments)</code> where $Name is the name of the method that was called but didn't exist, and $Arguments is an enumerated array of the arguments passed to that method. In Garden, I've taken advantage of __call to achieve what I've called "magic events". There are two types of magic events in Garden: "Declared" and "Called".</p>
<h2>2a. Declared Magic Events</h2>
<p>The theory behind declared magic events is that I can mis-name a method declaration by prefixing it with a pre-defined character (in Garden I've used "x" as the standard character). Then, when the class is instantiated, and that method is called without the "x" before the name, Pluggable's __call method is fired. Within the __call method, Pluggable looks to the PluginManager to see if any plugins have attached to one of three automatic methods: Before, Override, and After. Let's take a look at an example of how this might work:</p>
<pre lang="php">// Imagine this class is a core Garden class
class MyFancyClass extends Pluggable {
    public function <strong>x</strong>Tickle() {
        echo 'You just tickled my fancy!';
    }
}
$MyFancy = new MyFancyClass();
$MyFancy-&gt;Tickle();
// would typically render:
// You just tickled my fancy!</pre>
<p>Now, let's say I want to do something any time that method is called. For example, let's say I want to prefix that message with a salutation like "Hey stranger, ". I could easily do that by creating a plugin like so:</p>
<pre lang="php">// Define the plugin:
$PluginInfo['SuperFancifier'] = array(
   'Description' =&gt; 'Adds some niceties onto MyFancyClass.',
   'Version' =&gt; '1.0',
   'RequiredPlugins' =&gt; FALSE, // This is an array of plugin names/versions that this plugin requires
   'HasLocale' =&gt; FALSE, // Does this plugin have any locale definitions?
   'RegisterPermissions' =&gt; FALSE, // Permissions that should be added for this plugin.
   'SettingsUrl' =&gt; FALSE, // Url of the plugin's settings page.
   'SettingsPermission' =&gt; FALSE, // The permission required to view the SettingsUrl.
   'Author' =&gt; "Mark O'Sullivan",
   'AuthorEmail' =&gt; 'mark@lussumo.com',
   'AuthorUrl' =&gt; 'http://markosullivan.ca'
);

class SuperFancifierPlugin extends Gdn_Plugin {
   public function MyFancyClass_Tickle_Before($Sender) {
        echo 'Hey Stranger, ';
   }
}</pre>
<p>The first thing you see in this plugin is a definition for this plugin that is added to a "PluginInfo" array. There is a lot more information here than you might be used to coming from Vanilla 1. But, hopefully, it all looks fairly straightforward to you. I define the plugin's name, description, author, author info, permissions, settings url, etc. All of these are customizable, and only the name, description, and plugin author are required. Everything else is there simply to help make your plugin more reliable and easier to implement. Furthermore, since a lot of these are new and changing every day, I'll leave their explanation until the core is finished and the documentation is written. Let's get back on track by looking at my actual plugin class code. As you can see, I've created a class called SuperFancifierPlugin that extends the Gdn_Plugin base class. Using reflection, the PluginManager class can examine all declared classes to see which ones implement the IPlugin interface (which Gdn_Plugin does). After it finds all of them, it examines their methods. In this example, the PluginManager would find the SuperFancifierPlugin and it's MyFancyClass_BeforeTickle_Handler method. It would break apart the method name based on the underscores and know that (a) it is trying to plug in to the "MyFancyClass" class, and (b) it wants to fire the method "Before" MyFancyClass' Tickle() method. The plugin manager knows all of this before MyFancyClass has even been included. It simply keeps a record of all plugins and all classes/methods they want to attach to. So, in the example above, after this plugin is included in the Garden bootstrapper, the following would happen:</p>
<pre lang="php">$MyFancy = new MyFancyClass();
$MyFancy-&gt;Tickle();
// would now render:
// Hey Stranger, You just tickled my fancy!</pre>
<p>I could take it a step further and add something afterwards like so:</p>
<pre lang="php">class SuperFancifierPlugin extends Gdn_Plugin {
   public function MyFancyClass_Tickle_Before($Sender) {
        echo 'Hey Stranger, ';
   }
   public function MyFancyClass_Tickle_After($Sender) {
        echo "nWasn't that nice of you!?";
   }
}</pre>
<p>Which would make the following happen:</p>
<pre lang="php">$MyFancy = new MyFancyClass();
$MyFancy-&gt;Tickle();
// would now render:
// Hey Stranger, You just tickled my fancy!
// Wasn't that nice of you!?</pre>
<p>And finally, I could completely change everything by overriding the Tickle method like so:</p>
<pre lang="php">class SuperFancifierPlugin extends Gdn_Plugin {
   public function MyFancyClass_Tickle_Override($Sender) {
        echo 'I've overridden your fancy tickler.';
   }
}</pre>
<p>Which would result in the following:</p>
<pre lang="php">$MyFancy = new MyFancyClass();
$MyFancy-&gt;Tickle();
// would now render:
// I've overridden your fancy tickler.</pre>
<h2>2b. Called Magic Events</h2>
<p>So, you've seen how a declared magic event forces Pluggable's __call method to fire whenever the "real" (non-x'd) name of the method is called. Now let's talk about the flipside to that coin: called magic events. A "called" magic event happens when a class method is declared <strong>without</strong> the "x" before the name, but is called <strong>with</strong> the "x" before the name. For example:</p>
<pre lang="php">class MyFancyClass extends Pluggable {
    public function Tickle() {
        echo 'You just tickled my fancy!';
    }
}
$MyFancy = new MyFancyClass();
$MyFancy-&gt;<strong>x</strong>Tickle();
// would typically render:
// You just tickled my fancy!
// Unless I had my override plugin enabled, in which case it would render:
// I've overridden your fancy tickler.</pre>
<p>So, what's the difference between a called magic event and a declared magic event? It's quite a large difference, actually. With a declared magic event, the plugin would be guaranteed to attach whenever that method is referenced. However, with a "called" magic event, the plugin would only attach if the method was called with the "x" prefix. At the time of this writing, there are no called magic events in Garden. I am thinking that I will add them as necessary just like custom events. Furthermore, I've only used declared magic events with the Controller class' Render and FetchView methods as these are the only places I've needed them so far. Of course, as time passes, I'm sure we will find more places to add all three types of events.</p>
<h2>3. Function Overrides</h2>
<p>I would have liked it if there were no functions in Garden. In my mind, functions should be in a class even if it is a static utility class that refers to the methods just like you would if they were functions. However, when I started writing Garden (and still today), PHP was lacking some things that I think would be necessary in order to put functions into a static utility class. For example, __callStatic isn't production-ready, yet. So there would be no way to override functions if they were in a static class. So, as you may have seen in any of the other PHP-based frameworks out there, I've provided a last-ditch effort to allow plugin authors to override functions: function overrides. Simply put, all functions in Garden are declared like so:</p>
<pre lang="php">if (!function_exists('FunctionName')) {
   function FunctionName() {}
}</pre>
<p>So, the plugin author has the ability to override any core function simply by defining it before the framework does.</p>
<h2>4. Magic Methods</h2>
<p>Finally, we come to magic methods. Imagine that there is a controller in Garden that doesn't perform some task that you think is necessary. For example, what if I had created a UserController controller that only had methods to search for users, show users, and edit users. What if you wanted that controller to have a method to add a new user? That's where magic methods come into play. Magic methods in Garden essentially allow you to create new methods and add them to existing objects. They are created in much the same way that you plug into events. Using the MyFancyTickler class example above, what if I wanted to create a method on that class so that I could massage my fancy? I could create a plugin like so:</p>
<pre lang="php">class MassageMyFancyPlugin extends Gdn_Plugin {
   public function MyFancyClass_Massage_Create($Sender) {
        echo "I'm massaging my fancy...";
   }
}</pre>
<p>That's it. With this plugin enabled, you could now do the following:</p>
<pre lang="php">class MyFancyClass extends Pluggable {
    public function Tickle() {
        echo 'You just tickled my fancy!';
    }
}
$MyFancy = new MyFancyClass();
$MyFancy-&gt;Massage();
// And it would render:
// I'm massaging my fancy...</pre>
<h2>Conclusion</h2>
<p>There are still things I could tell you about other ways to use the Pluggable class, but I think that's enough for today. I know that some of you are probably worried that the magic methods will be too heavy on the server (this is a common complaint amongst the PHP developer community), but I've <a href="http://markosullivan.ca/blog/?p=206">done my own homework</a> that has helped me to both speed up my implementation of __call, and prove to me that (when used properly) it's effects on speed are negligible. The bottom line is that when you see how it can be used, the benefits far outweigh the loss. I seriously can't wait to see what type of plugins the community comes up with for Garden. Imagine the possibilities!</p>
<h2>Your first plugin...</h2>
<p>Now that you know what a plugin is, and some of the things you can do with them, why not check out the [[pluginquickstart|Plugin Quick Start Guide]] to get the ball rolling?</p>