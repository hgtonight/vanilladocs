---
title: Categories
layout: api
categories: ["API"]
---

## /categories/add

[code-canvas]
```http
POST /api/v1/categories/add.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```
[/code-canvas]

Adds a new category.

[__Authentication__](../#making-api-calls): required

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`Name`__          | `string`  | The name of the category
__`UrlCode`__       | `string`  | URL friendly category stub
__`Description`__   | `string`  | Description of this category
`Sort`              | `integer` | Category sort order rank
`ParentCategoryID`  | `integer` | Parent Category (ID, use if no Name)
`ParentCategory`    | `string`  | Parent Category (Name, use if no ID)
`Depth`             | `integer` | Nesting level
`AllowDiscussions`  | `boolean` | Whether this category allows new discussions
`Archived`          | `boolean` | Whether this category is archived


## /categories/edit

[code-canvas]
```http
POST /api/v1/categories/edit.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```
[/code-canvas]

Edits an existing category.

[__Authentication__](../#making-api-calls): required

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`CategoryID`__    | `integer` | Category to be edited (ID, use if no Name)
__`Category`__      | `string`  | Category to be edited (Name, use if no ID)
__`Name`__          | `string`  | The name of the category
__`UrlCode`__       | `string`  | URL friendly category stub
__`Description`__   | `string`  | Description of this category
`Sort`              | `integer` | Category sort order rank
`ParentCategoryID`  | `integer` | Parent Category (ID, use if no Name)
`ParentCategory`    | `string`  | Parent Category (Name, use if no ID)
`Depth`             | `integer` | Nesting level
`AllowDiscussions`  | `boolean` | Whether this category allows new discussions
`Archived`          | `boolean` | Whether this category is archived


## /categories/delete

[code-canvas]
```http
POST /api/v1/categories/delete.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```
[/code-canvas]

Deletes an existing category.

[__Authentication__](../#making-api-calls): required

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`CategoryID`__    | `integer` | Category to be deleted (ID, use if no Name)
__`Category`__      | `string`  | Category to be deleted (Name, use if no ID)


## /categories/list

[code-canvas]
```http
GET /api/v1/categories/list.ext HTTP/1.1
Host: https://yoursite.vanillaforums.com
```
[/code-canvas]

Get a list of categories.

[__Authentication__](../#making-api-calls): optional  
If not provided, perspective will be that of a guest.

### Parameters

_This method does not take any parameters._
