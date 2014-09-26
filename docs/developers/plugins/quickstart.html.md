---
title: Plugin Quickstart
layout: docs
categories: ["Developers","Addons"]
---

## Getting Started

The first thing you do when writing a plugin is create a folder for your plugin in the plugin directory named after the plugin. Inside the folder create a default.php file. Next, open the default.php file and add the plugin definition at the top, like this:

```php
// Define the plugin:
$PluginInfo['SamplePlugin'] = array(
   'Description' => 'This is a sample plugin.',
   'Version' => '1.0',
   'Author' => "Your Name",
   'AuthorEmail' => 'you@yourdomain.com',
   'AuthorUrl' => 'http://yourdomain.com'
);
```

There are other definition settings you can provide, but this is the bare minimum you need to get started. To find out about all of the other definition settings, read the [[Plugins|complete plugin documentation]].

## Writing The Code

There are many ways to approach writing a plugin in Vanilla, but there are the three methods you can use to "hook" into the Vanilla code: Custom Events, Magic Events, and Magic Methods.

### Custom Events

Custom events are thrown at various places in the Vanilla code, and you can attach to them in order to perform some kind of action. For example, Vanilla fires a custom event called "DiscussionOptions" in the discussion list when the discussion option dropdown is being created. In order to attach to this event and add a new option, you could accomplish it with the following code:

```php
class SamplePlugin extends Gdn_Plugin {
    public function DiscussionsController_DiscussionOptions_Handler($Sender) {
        $Sender->Options .= '<li><a href="">New Discussion Option</a></li>';
    }
}
```

The way the handler method is declared defines how and where it attaches. In this example, the "DiscussionsController" part of the method name tells the plugin manager to look in the DiscussionsController for the event handler we are attaching to. The "DiscussionOptions" part of the method name identifies the name of the event handler to attach to. Every event handler in Vanilla passes in the "Sender" as the first parameter, where the Sender is the object being attached to. In this example, the "Sender" is the DiscussionsController object. To put it simply, you can think of your event handler as a function that gets called exactly where the event handler is called. You can attach as many handlers to an event as you like. We are adding new event handlers all the time, and we are working on a Vanilla Developer plugin that will allow you to visually see on every page where there are events for you to attach to when that the developer plugin is enabled.

### Magic Events

Vanilla has the ability to create what we've called "Magic Events". Magic events allow you to attach to custom events that fire when a method is called in the Vanilla code. At the time of this writing, there is only one method in Vanilla that fires Magic Events: the Controller class' "Render" method. The magic events that fire are:

* ObjectName_EventName_Before
* ObjectName_EventName_Override
* ObjectName_EventName_After

These three magic events allow you to perform actions before and after the method gets called, as well as completely override the event if you wish. In the example of the base controller class' Render method, it means that you could choose any controller in any application and perform actions before, after, or instead of the default one. The Magic Events also have the ability to act as a wildcard by specifying "Base" instead of the ObjectName (ie. Base_Render_Before). This gives you the power to attach to a magic event any time any controller calls its render method. To summarize, here are a bunch of examples of the type of things you can do with Magic Events:

```php
class SamplePlugin extends Gdn_Plugin {
    public function DiscussionsController_Render_Before($Sender) {
        // This method gets called before the Render method gets called on the DiscussionsController object.
    }

    public function PostController_Render_Override($Sender) {
        // This method gets called in place of the PostController's Render method.
    }

    public function DraftsController_Render_After($Sender) {
        // This method gets called after the Render method gets called on the DraftsController object.
    }

    public function Base_Render_Before($Sender) {
        // This method gets called before the Render method gets called on every single class that
        // extends the Controller class (ie. every controller in every application).
    }
}
```

### Magic Methods

Finally, we come to magic methods. Imagine that there is an object in Vanilla that doesn't perform some task that you think is necessary. For example, what if I had created a UserController controller that only had methods to search for users, show users, and edit users. What if you wanted that controller to have a method to add a new user? That's where magic methods come into play. Magic methods in Vanilla essentially allow you to create new methods and add them to existing objects. They are created in much the same way that you attach to events. Using my UserController example, here is how I would create a Magic Method to add a new user:

```php
class SamplePlugin extends Gdn_Plugin {
   public function UserController_Add_Create($Sender) {
        // I'd have some logic in here to save the user
        // Now I'll render a custom view I've created for this new method.
        // You'd want to have an file in plugins/SamplePlugin/views/adduser.php.
        $Sender->Render('AddUser', '', 'plugins/SamplePlugin');
   }
}
```

In this example, we are attaching to the UserController object, defining an "Add" method, and using the special "Create" syntax so that the plugin manager knows to create our new method when someone attempts to call an "Add" method on the UserController object. That's it!

## More Information

If you want more in-depth information on how to create plugins in Vanilla, here are some places you can go:

* [Detailed information about plugins](../)
* [Download an example plugin to help you get started](http://www.vanillaforums.org/addon/example-plugin-1.0)
* [Download some plugins from the addon site and see how some functioning plugins work](http://vanillaforums.org/addons)
* [Get some help in the developer community](http://vanillaforums.org/categories/developers)
