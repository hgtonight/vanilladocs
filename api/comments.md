---
title: Comments
layout: documentation-api
---

## /comments/add

```sh
# HTTP Request
POST https://yoursite.vanillaforums.com/api/v1/comments/add.ext
```

Creates a new comment.

[__Authentication__](../#toc_5): `required`

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`DiscussionID`__  | `integer` | Discussion to post comment to
__`Body`__          | `string`  | Comment body
__`Format`__        | `string`  | Comment output format
`ForeignID`         | `string`  | Related foreign content identifier
`Type`              | `string`  | Comment type
