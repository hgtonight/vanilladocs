---
title: Framework
layout: page
categories: ["Developers","Framework"]
---

## Garden

Vanilla is built on an MVC framework named Garden. Its purpose is to provide an extensible, pluggable platform on which to build all the addons that make Vanilla awesome. The design of its database handling was influenced by CodeIgniter, but its plugin architecture is pretty unique.

There are 4 types of addons in Garden:

* Themes
* Plugins
* Applications
* Locales

At some point in the near future, we'll be combining applications and plugins to simplify things. In the meantime, the primary difference between them is that applications can use native controllers more easily, making more complex software a little less messy to navigate.

## Default applications

Three applications come pre-installed & enabled with Vanilla: Dashboard, Vanilla, and Conversations. On a very technical level, 'Vanilla' is simply a Garden addon that works in concert with others to create your forum experience. The Vanilla application is only responsible for discussions, comments, and categories.

Meanwhile, the Dashboard application powers your Dashboard UI, users, roles, activity, and much of the core functionality used by a member-driven website. The Conversations application powers private messaging. To disable private messaging, simply disable the Conversations application.

If you just want to use the Garden framework, you could, theoretically, disable all the core Applications and roll your own from scratch. In reality, we recommend always at least using Dashboard. Even if you're not building a forum with Garden, it's definitely built with a user-centric website in mind.

## Let the code guide you

Because so much is possible with the Garden framework, it can be intimidating to get started. Our best advice is: look at an existing plugin that does something *close* to what you're attempting to see how they do it. Code examples are the very best way to learn about Garden, and they can guide you to new solutions you didn't know were possible.

## Where to start

Not sure what doc to read next? We recommend reading the [plugin quickstart](/developers/plugins/quickstart), then try [Controller](/developers/framework/controllers) and [Models](/developers/framework/models). It's a self-guided tour from there! Don't forget to stop by the [community forum](http://vanillaforums.org/discussions) for guidance.
