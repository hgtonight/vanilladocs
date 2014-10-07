---
title: Site Hub
layout: docs
categories: ["API"]
---

## Overview

The site hub api allows you to create sites on your VIP cluster. You can make hub api calls just like other api calls, but you make those calls against your site hub rather than an individual site. Most hub api calls will be against `https://yourdomain.com/hub/api/v1`.

All endpoints for multisites require an access token with administrative privledges.

## GET /multisites

```http
GET /hub/api/v1/multisites.json?access_token=token HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

Gets a list of sites in your hub.

[__Authentication__](../#making-api-calls): required

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
`search`            | `string`  | The site name to search for.

## POST /multisites

```http
POST /hub/api/v1/multisites.json?access_token=token HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

Create a new site and queues it for building. When a site is created it will not be immediately available, but instead be in a *Building* status. Usually, sites take about a minute to build.

[__Authentication__](../#making-api-calls): required

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`Name`__          | `string`  | A human readable name for the site.
__`Slug`__          | `string`  | The site's folder. Make sure to use just alphanumeric, lowercase characters for the slug.

## GET /multisites/{id}

```
GET /hub/api/v1/multisites/1.json?access_token=token HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

Get the details of an individual site by ID.

[__Authentication__](../#making-api-calls): required

### Parameters

Parameter           | Type      | Description
---                 | ---       | ---
__`id`__            | `path`    | The ID of the site.

## POST /multisites/syncnode

```
POST /hub/api/v1/multisites/syncnode.json?access_token=token HTTP/1.1
Host: https://yoursite.vanillaforums.com
```

Syncronize the sites against the hub. Note that this method doesn't have to be called as the nodes automatically synchronize every 20 minites.

[__Authentication__](../#making-api-calls): required