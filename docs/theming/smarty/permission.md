---
title: "{permission}"
layout: docs
categories: ["Theming", "Smarty"]
---

## Block: `{permission}`

```smarty
{permission require="string"}
    Foo
{/permission}
```

Only output content if the current user has the specified permission.

### Parameters

Parameter       | Type      | Default   | Description
---             | ---       | ---       | ---
__`require`__   | `string`  | none      | The permission to check for
