---
title: Discussions
layout: documentation-api
---

## /discussions/add

```sh
# HTTP Request
POST https://yoursite.vanillaforums.com/api/v1/discussions/add.ext
```

Creates a new discussion.

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`Name`__          | `string`  | Discussion name
__`Body`__          | `string`  | Discussion body
__`Format`__        | `string`  | Discussion output format
__`CategoryID`__    | `integer` | Discussion Category (ID, use if no Name)
__`CategoryName`__  | `string`  | Discussion Category (Name, use if no ID)
`ForeignID`         | `string`  | Related foreign content identifier
`Tags`              | `csv`     | List of discussion tags
`Type`              | `string`  | Discussion type
`Closed`            | `boolean` | Discussion closed state
`Announce`          | `boolean` | Discussion announced state
`Sink`              | `boolean` | Discussion sunk state

## /discussions/category

```sh
# HTTP Request
GET https://yoursite.vanillaforums.com/api/v1/discussions/category.ext
```

Get a list of discussions within a category.


### Parameters

Parameter                   | Type                  | Description
---                         | ---                   | ---
__`CategoryIdentifier`__    | `integer` `string`    | Category identifier (CategoryID or UrlCode)
`Page`                      | `integer`             | Page number
