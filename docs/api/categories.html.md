---
title: Categories
layout: page
categories: ["API"]
---

## /categories/add

```sh
# HTTP Request
POST https://yoursite.vanillaforums.com/api/v1/categories/add.ext
```

Adds a new category.

[__Authentication__](../#toc_5): `required`

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

```sh
# HTTP Request
POST https://yoursite.vanillaforums.com/api/v1/categories/edit.ext
```

Edits an existing category.

[__Authentication__](../#toc_5): `required`

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

```sh
# HTTP Request
POST https://yoursite.vanillaforums.com/api/v1/categories/delete.ext
```

Deletes an existing category.

[__Authentication__](../#toc_5): `required`

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`CategoryID`__    | `integer` | Category to be deleted (ID, use if no Name)
__`Category`__      | `string`  | Category to be deleted (Name, use if no ID)


## /categories/list

```sh
# HTTP Request
GET https://yoursite.vanillaforums.com/api/v1/categories/list.ext
```

Get a list of categories.

[__Authentication__](../#toc_5): `optional`  
If not provided, perspective will be that of a guest.

### Parameters

_This method does not take any parameters._
