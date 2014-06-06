---
title: Asynchronous Requests
layout: docs
categories: ["Developers","Framework"]
---

## Ajax

We've chosen [jQuery](http://jquery.com) as the main javascript library for Vanilla. The jQuery core has a number of [ajax-related methods](http://docs.jquery.com/Ajax) that make ajax-based forms and functionality easy as pie. In order to help facilitate partial page loading &amp; updating, We've made Vanilla's base Controller class (the class from which all controllers are extended) accept a DeliveryType parameter on every request. Depending on the type of delivery being requested, a controller in garden will deliver all of a page, part of a page, or part of a page plus extra information as JSON. At the time of this writing, there are four delivery types available:

1. `DELIVERY_TYPE_ALL`: Deliver an entire page (a standard request).
2. `DELIVERY_TYPE_ASSET`: Deliver all content for the requested asset.
3. `DELIVERY_TYPE_VIEW`: Deliver only the requested view.
4. `DELIVERY_TYPE_BOOL`: Deliver only the success status of the request as a boolean.

If no delivery type is provided in the request, `DELIVERY_TYPE_ALL` is assumed. In our programming for Vanilla 2 and the main Garden management screens, we've found that 99% of the time we either use `DELIVERY_TYPE_ALL` or `DELIVERY_TYPE_VIEW`. The four delivery types are just constants defined as:

```php
define('DELIVERY_TYPE_ALL', 1);
define('DELIVERY_TYPE_ASSET', 2);
define('DELIVERY_TYPE_VIEW', 3);
define('DELIVERY_TYPE_BOOL', 4);
```

In order to made the controller deliver content other than `DELIVERY_TYPE_ALL`, you would have to append the request url (or post data) with `DeliveryType=3` (or whatever type of delivery type you want). The controller will grab this value from whatever collection you send it in and then know how to handle the request. In all four delivery types, the standard response for the controller is to simply take the requested data and spit it to the response. The only exception to this rule is if there is a form posted to the controller. In the case of a form being posted to the controller, it will take the response xhtml and place it into a JSON array along with a couple of other standard bits of information *and* any extra information that you may want to add. Let's take a look at some examples of how the delivery type works.

## Form Popups

<center><img class="Border" title="users" src="http://markosullivan.ca/blog/wp-content/uploads/2008/12/users.gif" alt="users" width="400" height="163" /></center>

In a `DELIVERY_TYPE_ALL` request, you could be looking at a list of users with an "edit" link next to each of them. You click the edit link, and it takes you to a page that presents you with a form where you can edit all of their information. If you were editing my account, this url might look something like: `http://localhost/garden/user/edit/mark` This means that you've called Garden's `$UserController->Edit('mark');` method, and Garden is going to fetch the `/garden/views/user/edit.php` view file, place it in the `views/default.master` master view file and deliver everything to the screen. I've created a jquery "popup" plugin for Garden that allows you to turn any link in Garden into a view-based popup by applying a "Popup" class to the anchor tag of the link. So, if I had placed that class on the "edit" link next to my username, here's how the request would be handled by the controller: The jquery-based popup plugin appends a "DeliveryType=3" parameter to the request url and then sends the request. Garden's `$UserController->Edit('mark');` method is called, and Garden fetches the `/garden/views/user/edit.php` view file. At this point it only sends the view back to the popup plugin as a string of xhtml. The popup plugin takes the code from that view file and places it into an element on the page, positioning it above the existing page content. So, without loading a new page I've now been presented with the edit user form in an in-page popup.

<center><img class="Border" title="edituser" src="http://markosullivan.ca/blog/wp-content/uploads/2008/12/edituser.gif" alt="edituser" width="422" height="436" /></center>

If I then make changes to the inputs and submit the form, the popup plugin once again hijacks this request, making it an ajax-based request. The controller sees that it only needs to deliver the view once again, and it also sees that a form has been posted back. So, it takes the resulting xhtml and places it into a JSON array to be sent to the response. It also adds extra information to the json array like: (1) a boolean value indicating if the form was saved, (2) a status message, (3) a redirect url, etc. Using these json values the popup can then decide if it should re-present the form with any errors that may have occurred, or hide the form and update data on the underlying page.

## Progressive Data Loading

One of the major changes I've been working with in Vanilla 2 is progressive data loading. In a standard, non-javascript-based request, I've made it so that at the end of a page of comments the user is presented with a "show X more comments" button. When that button is clicked, it takes you to the second, third, nth page of comments. However, if javascript is enabled, jQuery will hijack those button clicks and make the request as a `DELIVERY_TYPE_VIEW`. It then takes the next page of comments and appends them to the existing comment list directly in the page. These are just two examples of how ajax is integrated into the Garden core. There are a number of other ways that it is used, and I'm adding more methods every day. The ajax code has already been through many revisions, and I anticipate that once the code goes public there will be javascript gurus in the community who will have a lot of great ideas for how to optimize and improve upon what I've done.
