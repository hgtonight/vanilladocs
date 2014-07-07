---
title: Comments
layout: api
categories: ["API"]
---

## /comments/add

[code-canvas]
```http
POST /api/v1/comments/add.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```
[/code-canvas]

Creates a new comment.

[__Authentication__](../#making-api-calls): required

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`DiscussionID`__  | `integer` | Discussion to post comment to
__`Body`__          | `string`  | Comment body
__`Format`__        | `string`  | Comment output format
`ForeignID`         | `string`  | Related foreign content identifier
`Type`              | `string`  | Comment type
