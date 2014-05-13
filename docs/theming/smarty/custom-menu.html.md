---
title: "{custom_menu}"
layout: docs
categories: ["Theming", "Smarty"]
---

## Function: `{custom_menu}`

```smarty
{custom_menu format="string" wrap="string"}
```

A placeholder for future menu items.

### Parameters

Parameter   | Type      | Default   | Description
---         | ---       | ---       | ---
`format`    | `string`  | none      | Custom format to use when wrapping links. Available template variables are `%url`, `%class`, and `%text`
`wrap`      | `string`  | `li`      | Element to wrap around each link in the menu
