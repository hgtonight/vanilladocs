---
title: Discussions
layout: api
categories: ["API"]
---

## /discussions/add

```http
POST /api/v1/discussions/add.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

Creates a new discussion.

[__Authentication__](../#toc_5): `required`

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`Name`__          | `string`  | Discussion name
__`Body`__          | `string`  | Discussion body
__`Format`__        | `string`  | Discussion output format
__`CategoryID`__    | `integer` | Discussion Category (ID, use if no Name)
__`Category`__      | `string`  | Discussion Category (Name, use if no ID)
`ForeignID`         | `string`  | Related foreign content identifier
`Tags`              | `csv`     | List of discussion tags
`Type`              | `string`  | Discussion type
`Closed`            | `boolean` | Discussion closed state
`Announce`          | `boolean` | Discussion announced state
`Sink`              | `boolean` | Discussion sunk state


## /discussions/bookmark

```http
POST /api/v1/discussions/bookmark.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

Bookmark or unbookmark a discussion.

[__Authentication__](../#toc_5): `required`

### Parameters

Parameter           | Type                      | Description
---                 | ---                       | ---
__`Discussion`__    | [`smart id`](../smart-id) | Discussion to be bookmarked
`User`              | [`smart id`](../smart-id) | The user bookmarking the discussion. If blank then the currently authenticated user will be used
`Bookmark`          | `boolean`                 | Whether or not to bookmark the discussion

### Notes

You need the `Garden.Moderation.Manage` permission to bookmark a discussion for another user.


## /discussions/bookmarked

```http
GET /api/v1/discussions/bookmarked.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

List a user's bookmarked discussions.

[__Authentication__](../#toc_5): `required`


## /discussions/edit

```http
POST /api/v1/discussions/edit.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

Edits an existing discussion.

[__Authentication__](../#toc_5): `required`

### Parameters

Parameter           | Type                      | Description
---                 | ---                       | ---
__`Discussion`__    | [`smart id`](../smart-id) | Discussion to be deleted.
`Name`              | `string`                  | Discussion name
`Body`              | `string`                  | Discussion body
`Format`            | `string`                  | Discussion output format
`CategoryID`        | `integer`                 | Discussion Category (ID, use if no Name)
`Category`          | `string`                  | Discussion Category (Name, use if no ID)
`ForeignID`         | `string`                  | Related foreign content identifier
`Tags`              | `csv`                     | List of discussion tags
`Type`              | `string`                  | Discussion type
`Closed`            | `boolean`                 | Discussion closed state
`Announce`          | `boolean`                 | Discussion announced state
`Sink`              | `boolean`                 | Discussion sunk state


## /discussions/list

```http
POST /api/v1/discussions/list.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

[__Authentication__](../#toc_5): `optional`  
If not provided, perspective will be that of a guest.


## /discussions/category

```http
GET /api/v1/discussions/category.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

Get a list of discussions within a category.

[__Authentication__](../#toc_5): `optional`  
If not provided, perspective will be that of a guest.

### Parameters

Parameter                   | Type                  | Description
---                         | ---                   | ---
__`CategoryIdentifier`__    | `integer` `string`    | Category identifier (`CategoryID` or `UrlCode`)
`Page`                      | `integer`             | Page number
