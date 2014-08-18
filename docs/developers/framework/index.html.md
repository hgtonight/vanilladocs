---
title: Framework
layout: docs
categories: ["Developers","Framework"]
---

## Garden's place in Vanilla

Vanilla is built on an MVC framework named Garden. Its purpose is to provide an extensible, pluggable platform on which to build all the addons that make Vanilla awesome. The design of its database handling was influenced by CodeIgniter, but its plugin architecture is pretty unique.

Technically, Vanilla is a forum application (addon) built on top of the Garden framework. However, we typically refer to the entire stack as "Vanilla" for branding consistency and simplicity - including in these docs. 

Garden is a secondary concern to Vanilla, and therefore our decisions on the framework are primarily focused on improving the Vanilla application. In practice, this means that an issue or enhancement that effects Vanilla will be prioritized over one that exists solely to round out Garden's framework features.

## Addons are everything

Addons are the most important feature of the Garden framework. Our crown jewel, the Vanilla forum itself, is technically an addon. There are many ways for addons to hook into each other, and we're constantly refining their integration.

There are 4 types of addons in Garden:

* Themes
* Plugins
* Applications
* Locales

In the future, we plan to combine applications and plugins to simplify things. In the meantime, the primary difference between them is that applications can use native controllers more easily, making more complex software a little less messy to navigate. However, as of 2.3, plugins will be able to use native controllers.

Themes have the full power of plugins via their hooks file, but we suggest only using it for aesthetic changes.

## File structure

The core framework files are located in `/library/core`. The database layer is contained in `/library/database` and third-party libraries are in `/library/vendors`.

Our framework's frontend is built on Javascript and jQuery. jQuery files and plugins are in `/js/library` while files in the root `js` folder are custom to our framework.

Common subfolders in addons will include `design` (CSS and images), `js`, `modules`, `views`, and `settings` (structure and config).

Non-view PHP files are named in the format `{type}.{name}.php`. "Type" is one of class, functions, or interface. We do not rename third-party files included in Vanilla. Classes in addons nearly always inherit from one or more framework classes.

## Default applications

Three applications come pre-installed & enabled with Vanilla: Dashboard, Vanilla, and Conversations. On a very technical level, 'Vanilla' is simply a Garden addon that works in concert with others to create your forum experience. The Vanilla application is only responsible for discussions, comments, and categories.

Meanwhile, the Dashboard application powers your Dashboard UI, users, roles, activity, and much of the core functionality used by a member-driven website. The Conversations application powers private messaging. To disable private messaging, simply disable the Conversations application.

If you just want to use the Garden framework, you could, theoretically, disable all the core Applications and roll your own from scratch. In reality, we recommend always at least using Dashboard. Even if you're not building a forum with Garden, it's definitely built with a user-centric website in mind.

## Let the code guide you

Because so much is possible with the Garden framework, it can be intimidating to get started. Our best advice is: look at an existing plugin that does something *close* to what you're attempting to see how they do it. Code examples are the very best way to learn about Garden, and they can guide you to new solutions you didn't know were possible.

The Skeleton application in `/applications/skeleton` is heavily documented inline to help you get started.

## Where to start

Not sure what doc to read next? We recommend reading the [plugin quickstart](/developers/plugins/quickstart), then try [Controller](/developers/framework/controllers) and [Models](/developers/framework/models). It's a self-guided tour from there! Don't forget to stop by the [community forum](http://vanillaforums.org/discussions) for guidance.
