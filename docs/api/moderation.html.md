---
title: Moderation
layout: docs
categories: ["API"]
hidden: true
---

## Moderation API

Details about API endpoints for moderation.

Simple API will be needed to make requests from an un authencticated request.
To use Simple API you need to:

1. Enable to SimpleAPI Plugin
2. Prepend `/api/v1/` to the URL
3. Append `?access_token=XXXXXX` to the url

Example:

```
GET /api/v1//mod/preapproval.json?access_token=XXXXXX HTTP/1.1
Host: http://example.vanillaforums.com

{
  "QueueName": "premoderation",
  "Queue": [
    ....
  ],
  "Page": "p1",
  "Totals": {
    "Status": {
      "approved": 2,
      "denied": 1,
      "unread": 10
    },
    "Records": 13,
    "PageSize": 30,
    "Pages": 1
  }
}
```

### Permissions

All of the moderation endpoints require the `Garden.Moderation.Manage` permission.

If you do not have required access you will get the following error:

```
{
  "Code": 403,
  "Exception": "You don't have permission to do that.",
  "Class": "Gdn_UserException"
}
```

### Pagination

When making a request with paginatined results the following element will be included in the result.

```
{
  "Page": "p1",
  "Totals": {
    "Status": {
      "approved": 2,
      "denied": 1,
      "unread": 10
    },
    "Records": 13,
    "PageSize": 30,
    "Pages": 1
  }
}
```

You will need to use these numbers to create pagination.  

***Note*** that the Page is prefixed with a p for page.

### Errors

Any errors will be returning in the following format.

```
{
  "Code": 404,
  "Exception": "Not Found",
  "Class": "Gdn_UserException"
}
```

## GET /mod/premoderation/
## GET /mod/reported/
## GET /mod/spam/

List the items in each of the queues.

### Parameters

Parameter       | Type      | Description
---             | ---       | ---
`Page`          | `string`  | Page Number. Default is first page.
`CategoryID`    | `int`     | Category ID. Default all categories.
`Status`        | `string`  | approved, denied, unread
`SortOrder`     | `string`  | asc, or desc. Deafult desc.

### Example

```
GET /mod/preapproval.json?Page=p1 HTTP/1.1
Host: http://example.vanillaforums.com

{
  "QueueName": "preapproval",
  "Queue": [],
  "Page": "p1",
  "Totals": {
    "Status": {
      "unread": 0,
      "approved": 0,
      "denied": 0
    },
    "Records": 0,
    "PageSize": 30,
    "Pages": 0
  }
}
```

## GET /mod/relation

***@TODO***

Get all items in the queue by relation.

Parameter       | Type      | Description
---             | ---       | ---
`Page`          | `string`  | Page Number. Default is first page.
`relation`      | `enum`    | foreign-id, foreign-userid

## POST /mod/premoderation/
## POST /mod/reported/
## POST /mod/spam/

Add content to an existing queue.

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
**`Name`**          | `string`  | Content Title.    RE: Discussion Title for comments
**`Body`**          | `string`  | Content Body
**`Format`**        | `enum`    | html, bbcode, markdown, text, textex, wysiwyg
**`ForeignType`**   | `enum`    | comment, discussion, activity, activity-comment, conversation - message
**`ForeignID`**     | `string`  | The if of the content. Ie. DiscussionID
**`ForeignUserID`** | `string`  | The user who generated the content
`CategoryID`        | `string`  | Category ID
`CustomerVariables` |           | Up to 10 custom variables

### Response

```
{
  "QueueName": "testing",
  "QueueID": "6931",
}
```

### Errors

```
{
  "Code": 400,
  "Exception": "Name is a required field.",
  "Class": "Gdn_UserException",
}
```

## DELETE /mod/{id}

Remove content from a queue.

```
DELETE /mod/1.json HTTP/1.1
Host: http://example.vanillaforums.com

{
  "QueueID": 1
}
```

## PATCH /mod/{id}

Update an item in the queue.

### Parameters

Parameter   | Type      | Description
---         | ---       | ---
`Status`    | `enum`    | approved, denied, unread
`Queue`     | `enum`    | spam, reported, premoderation

### Example

```
DELETE /mod/1.json HTTP/1.1
Host: http://example.vanillaforums.com

{
  "QueueID": 1
}
```

## {METHOD} /mod/batch

Lets just call the methods we use for single for now.

**Proposed**.

Batch process items in the queue.

### PATCH Parameters

Batch update items in queue.

### Parameters

Parameter  | Type      | Description
---        | ---       | ---
`IDs`      | `string`  | CSV of queue ids
`Status`   | `enum`    | approved, denied, unread
`Queue`    | `enum`    | spam, reported, premoderation

### DELETE Parameters

Batch delete items in queue.

Parameter  | Type      |
---        | ---       | ---
`IDs`      | `string`  | CSV of queue ids

## Notes

counts - cache - memcache INCR. maybe table with denomarilzed data.

### Timestamps

What format? MySQL Datetime format

### Database Table

All of these rows will be returned in output of the above calls.

Parameter       | Type      | Description
---             | ---       | ---
`Queue`         | `enum`    | preapproval, reported, spam
`DateInserted`  | `string`  | Timestamp
`InsertUserID`  | `int`     | The user who inserted the item to the queue
`CategoryID`    | `string`  | Category ID
`Name`          | `string`  | Content Title.    RE: Discussion Title for comments
`Body`          | `string`  | Content Body
`ForeignType`   | `enum`    | comment, discussion, activity, activity-comment, conversation - message
`ForeignID`     | `string`  |  ex d-12
`ForeignUserID` | `string`  | The user who generated the content
`Status`        | `string`  | approved, denied, unread
`DateStatus`    |  `string` | Timestamp
`StatusUserID`  | `int`     | The user who last change the status
`Attributes`    | `string`  | see Attributes Document
