---
title: Database access
layout: docs
categories: ["Developers","Framework"]
---

## Database layer

Vanilla only supports MySQL. It has a generic SQL driver implementation built on top of PDO to potentially allow for other databases (which you can see in `/library/databases`). However, at this time, the Vanilla team has no plans to support additional databases.

The best way to access the database is via existing [models](/developers/framework/models). For instance, to get a list of discussions, use the `Get` method in the `DiscussionModel`. You can rely on model-based access to already be optimized for performance and utilize caching if it's available.

### Building queries

The `SQL` object supports chaining. You can call it with `Gdn::SQL()`.

Here's a simple example that gets a single discussion by its ID. We write its pieces in the order of a SQL statement, but they can be called in any order up to the `Get`. The `Get` is the call that fires the built query.

```
Gdn::SQL()->
   ->Select('*')
   ->From('Discussion')
   ->Where('DiscussionID', $DiscussionID)
   ->Get();
```

Note that this is an impractical query to use in your addon, because this functionality already exists in a model: 

```
$DiscussionModel = new DiscussionModel();
$DiscussionModel->GetID($DiscussionID);
```

Always use pre-existing calls in models when they are available for better performance and forward-compatibility.

Here's an example of a complex select that pulls out all the stops:

```
Gdn::SQL()
   ->Select('cm.*')
   ->Select('iu.Name', '', 'InsertName')
   ->From('ConversationMessage cm')
   ->Join('Conversation c', 'cm.ConversationID = c.ConversationID')
   ->Join('UserConversation uc', 'c.ConversationID = uc.ConversationID and uc.UserID = '.$ViewingUserID, 'left')
   ->Join('User iu', 'cm.InsertUserID = iu.UserID', 'left')
   ->BeginWhereGroup()
   ->Where('uc.DateCleared is null')
   ->OrWhere('uc.DateCleared <', 'cm.DateInserted', TRUE, FALSE)
   ->EndWhereGroup()
   ->Where('cm.ConversationID', $ConversationID)
   ->OrderBy('cm.DateInserted', 'asc')
   ->Limit($Limit, $Offset)
   ->Get();
```

Notice the use of limit, offset, where groups, where conditions including less than & null, aliasing, and multiple joins.

### Updates and inserts

An insert is a single step that takes the table name and an array of values to insert as parameters:

```
Gdn::SQL()->Insert('UserConversation', array(
   'ConversationID' => $ConversationID,
   'UserID' => $TargetUserID
));
```

An update requires setting the table in `Update`, ends with a `Put` (much like the select's ending `Get`):

```
Gdn::SQL()->Update('Conversation')
   ->Set('LastMessageID', $MessageID)
   ->Where('ConversationID', $ConversationID)
   ->Put();
```

### Direct queries

The `Query` method allows for sending unfiltered SQL queries to the database. This is strongly discouraged because it can easily cause security flaws, performance problems, and compatibility problems.

```
Gdn::SQL()->Query("select * from GDN_Comments");
```

### Structure

Vanilla allows you to define database structures in code. Use the `Gdn::Database()->Structure()` object. Here we'll look at part of the definition of the User table as an example:


```
Gdn::Database()->Structure()
   ->PrimaryKey('UserID')
   ->Column('Name', 'varchar(50)', FALSE, 'key')
   ->Column('Password', 'varbinary(100)') 
   ->Column('ShowEmail', 'tinyint(1)', '0')
   ->Column('Gender', array('u', 'm', 'f'), 'u')
   ->Column('Preferences', 'text', TRUE)
   ->Column('DateOfBirth', 'datetime', TRUE)
   ->Column('Score', 'float', NULL)
   ->Set($Explicit, $Drop);
```

`Column` takes 4 parameters: name, type, nulldefault (`true` to allow nulls, `false` to not - any other value becomes the default with disallowed nulls), and keytype ('primary', 'key', 'index', 'unique', or 'fulltext' - defaults to false). 

`PrimaryKey` creates an auto-incrementing column. The Gender column uses an array to create an `enum` type; the rest are self-explanatory. 
