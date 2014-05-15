# Moderation API

Details about API endpoints for moderation.

## GET /moderation/premoderation/
## GET /moderation/reported/
## GET /moderation/spam/

List the items in each of the queues.

### Parameters

Parameter           | Type      | Description
---             | ---       | ---
`Page`          | `string`  | Page Number. Default is first page.
`CategoryID`    | `int`     | Category ID. Default all categories. 
`State`         | `enum`    | Open or Closed.  Default ALL.

### Example

```http
GET /moderation/preapproval?page=p2 HTTP/1.1
Host: http://example.vanillaforums.com

{"response": "json"}
```

## GET /moderation/relation

Get all items in the queue by relation.

Parameter       | Type      | Description
---             | ---       | ---
`Page`          | `string`  | Page Number. Default is first page.
`relation`      | `enum`    | foreign-id, foreign-userid



## POST /moderation/premoderation/
## POST /moderation/reported/
## POST /moderation/spam/

Add content to an existing queue.

### Parameters

Parameter           | Type      | Description
---             | ---       | ---
`CategoryID`    | `string`  | Category ID 
`Name`          | `string`  | Content Title.    RE: Discussion Title for comments 
`Body`          | `string`  | Content Body
`Format`        | `enum`    | html, bbcode, markdown, text, textex, wysiwyg  
`ForeignType`   | `enum`    | comment, discussion, activity, activity-comment, conversation - message   
`ForeignID`     | `string`  | 
`ForeignUserID` | `string`  | The user who generated the content
List optional attributes. 


## DELETE /moderation/{id}

Remove content from a queue.

##PATCH /moderation/{id}

Update an item in the queue.

### Parameters

Parameter           | Type      | Description
---             | ---       | ---
`Status`    | `enum`  | approved, denied, unread 
`Queue` | `enum` | spam, reported, premoderation

## {METHOD} /moderation/batch

Batch process items in the queue.

### PATCH Parameters

Batch update items in queue.

### Parameters

Parameter           | Type      | Description
---             | ---       | ---
`Ids` | `string`  | CSV of queue ids
`Status` | `enum` | approved, denied, unread
`Queue` | `enum` | spam, reported, premoderation

### DELETE Parameters

Batch delete items in queue.

Parameter           | Type      |
---             | ---       | ---
`Ids` | `string`  | CSV of queue ids


#Notes

### Timestamps
What format?

### Database Table
All of these rows will be returned in output of the above calls.

Parameter           | Type      | Description
---             | ---       | ---
`Queue`         | `enum`    | preapproval, reported, spam
`State`         | `enum`    | approved, denied, unread
`DateInserted`  | `string`  | Timestamp
`CategoryID`    | `string`  | Category ID 
`Name`          | `string`  | Content Title.    RE: Discussion Title for comments 
`Body`          | `string`  | Content Body
`ForeignType`   | `enum`    | comment, discussion, activity, activity-comment, conversation - message   
`ForeignID`     | `string`  |  ex d-12
`ForeignUserID` | `string`  | The user who generated the content
`Status`        | `string`  | 
`Attributes`    | `string`  | see Attributes Document
