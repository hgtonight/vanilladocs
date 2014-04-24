---
title: Database Queries
layout: page
categories: ["Developers","Framework"]
---

<h1>Database &amp; Query Building</h1>
<p>The database files are located in /GardenRoot/library/database, and are as follows:</p>
<center><img class="Border" title="Database Files" src="http://markosullivan.ca/blog/wp-content/uploads/2008/12/fs-database.gif" alt="" width="255" height="183" /></center>
<p><strong>class.database.php</strong>: The main database file that is included by the Garden bootstrapper. <strong>class.databasestructure.php</strong>: A supplemental implementation of the database class specific to altering table (and view) structure in the database. This file is included on-demand. <strong>class.dataset.php</strong>: The dataset class allows you to traverse, manipulate, and return data objects or arrays. <strong>class.generic.driver.php</strong>: An abstract implementation of all properties and methods used to build and execute database queries. <strong>class.generic.structure.php</strong>: An abstract implementation of all properties and methods used to build and execute database queries specific to altering database (and view) structure. <strong>class.mysql.driver.php</strong>: A MySQL-specific implementation of the class.generic.driver.php abstract class. This class overrides the generic class where necessary in order to perform functions specific to MySQL. <strong>class.mysql.structure.php</strong>: A MySQL-specific implementation of the class.generic.structure.php abstract class. This class overrides the generic class where necessary in order to perform functions related to altering database (and view) structure specific to MySQL.</p>
<h2>Putting it all Together</h2>
<p>As you can likely imagine, the MySQL-specific files are just one implementation of the generic driver and structure. Theoretically I could create other database-specific files and use those instead. When I first started working on the classes, for example, I created two other implementations: SQLite and <a href="http://markosullivan.ca/blog/?p=83">Microsoft SQL Server</a>. MySQL is the only implementation planned for launch, but others may come afterwards. With this in mind, the class.database.php file contains the following:</p>
<pre lang="php">// Include the base/generic driver and dataset classes
include(PATH_LIBRARY . DS . 'database' . DS . 'class.generic.driver.php');
include(PATH_LIBRARY . DS . 'database' . DS . 'class.dataset.php');

// Include the selected driver class
$DatabaseEngine = $Config-&gt;Get('Database.Engine');
include(PATH_LIBRARY . DS . 'database' . DS . 'class.'.strtolower($DatabaseEngine).'.driver.php');

// Create a standard database class extended from the selected driver.
eval('class Database extends '.$DatabaseEngine.'Driver {}');</pre>
<p>So, as you can see, the first thing I do is include the generic driver and the dataset classes. These are required in order to perform any database requests. Next up I grab the defined database engine from the configuration (in it's current state: MySQL), and include the driver for that class. Finally, I create a class simply called "Database" that extends the driver-specific class. So, no matter what driver is implemented, you can always get at your database class by instantiating a <code>new Database();</code></p>
<h2>Using the Database class</h2>
<p><em>Note: The Database class uses PDO to query the database. This is never apparent outside of the class, but is a point of interest to some.</em>The database class allows you to do everything from querying with a straight SQL string, to building a sql string and executing it with various Database methods, to one-line convenience methods that return a dataset with a single line of code. My main goal was to add flexibility. Let's start with an example of building a simple select statement. Imagine you wanted to use the database class to query the following information:</p>
<pre lang="sql">select Name
   ,Color
   ,MaxSpeed
from Car
where MaxSpeed &gt; 80;</pre>
<p>In it's most simple form, the Database class could be used to retrieve this information by placing that SQL into a $Sql variable and calling the following:</p>
<pre lang="php">$DataSet = $Database-&gt;Query($Sql);</pre>
<p>However, this is not really the preferred method. After all, what happens down the road when we implement a new database class with a different driver that doesn't support the exact same syntax as MySQL? So, let's build the same query using the Database class' various query building methods:</p>
<pre lang="php">$Database-&gt;Select('Name, Color, MaxSpeed');
$Database-&gt;From('Car');
$Database-&gt;Where('MaxSpeed &gt;', '80');
$DataSet = $Database-&gt;Get();</pre>
<p>Fairly simple, but the Database query building methods also implement chaining. So, this query could have just as easily been written in the following manner:</p>
<pre lang="php">$DataSet = $Database-&gt;Select('Name, Color, MaxSpeed')-&gt;From('Car')-&gt;Where('MaxSpeed &gt;', '80')-&gt;Get();</pre>
<p>Neat! But the Database class also has a bunch of different convenience methods. So, let's try building the same query using Database::GetWhere():</p>
<pre lang="php">$DataSet = $Database-&gt;GetWhere('Car', array('MaxSpeed &gt;' =&gt; '80'));</pre>
<p>OK, so we can retrieve data from the database in various different ways. Let's try a more complex example with some joins. How about this:</p>
<pre lang="sql">select Car.Name
   ,Car.Color
   ,Car.MaxSpeed
   ,Brand.Name as Brand
   ,Engine.Name as Engine
from Car
inner join Brand
   on Car.BrandID = Brand.BrandID
inner join Engine
   on Car.EngineID = Engine.EngineID
where Car.MaxSpeed &gt; 80;</pre>
<p>Piece of cake:</p>
<pre lang="php">$DataSet = $Database-&gt;Select('Car.Name, Car.Color, Car.MaxSpeed')
    -&gt;Select('Brand.Name', '', 'Brand')
    -&gt;Select('Engine.Name', '', 'Engine')
    -&gt;From('Car')
    -&gt;Join('Brand', 'Car.BrandID = Brand.BrandID')
    -&gt;Join('Engine', 'Car.EngineID = Engine.EngineID')
    -&gt;Where('Car.MaxSpeed &gt;', '80')
    -&gt;Get();</pre>
<p>But that's a bit verbose. How about if we used aliases instead, like this:</p>
<pre lang="sql">select c.Name
   ,c.Color
   ,c.MaxSpeed
   ,b.Name as Brand
   ,e.Name as Engine
from Car c
inner join Brand b
   on c.BrandID = b.BrandID
inner join Engine e
   on c.EngineID = e.EngineID
where c.MaxSpeed &gt; 80;</pre>
<p>Not a problem:</p>
<pre lang="php">$DataSet = $Database-&gt;Select('c.Name, c.Color, c.MaxSpeed')
    -&gt;Select('b.Name', '', 'Brand')
    -&gt;Select('e.Name', '', 'Engine')
    -&gt;From('Car c')
    -&gt;Join('Brand b', 'c.BrandID = b.BrandID')
    -&gt;Join('Engine e', 'c.EngineID = e.EngineID')
    -&gt;Where('c.MaxSpeed &gt;', '80')
    -&gt;Get();</pre>
<p>And how about if we added some more conditions to the where clause? You could continue to add lines to the query:</p>
<pre lang="php">// ...
$Database-&gt;Where('c.MaxSpeed &gt;', '80');
$Database-&gt;Where('c.Color', 'Blue');</pre>
<p>Or you could simply manipulate your original where definition to use an associative array of conditions:</p>
<pre lang="php">// ...
$Database-&gt;Where(array('c.MaxSpeed &gt;' =&gt; '80', 'c.Color' =&gt; 'Blue'));</pre>
<p>You might be wondering how the database class handles database table prefixes. For example, in Vanilla 1, all of the vanilla-related tables were prefixed with "LUM_". So, what if our example tables had the LUM_ prefix? How would that change our Database class' method calls?</p>
<pre lang="sql">select c.Name
   ,c.Color
   ,c.MaxSpeed
   ,b.Name as Brand
   ,e.Name as Engine
from LUM_Car c
inner join LUM_Brand b
   on c.BrandID = b.BrandID
inner join LUM_Engine e
   on c.EngineID = e.EngineID
where c.MaxSpeed &gt; 80;</pre>
<p>The simple answer is that it wouldn't. You'd still specify all of the queries in the ways I've defined above. The database class has a "DatabasePrefix" property that is defined by the Garden bootstrapper (and can be changed at any time on the fly). You never need to concern yourself with database table prefixes. The Database class will search and prepend them where necessary as queries are built.</p>
<h3>Connection</h3>
<p>One final thing to note is that the database class lazy-loads the database connection. This means that there are no connections to the database opened until you actually run a query. So, if a page doesn't require any database access, the database class will never open a connection unnecessarily.</p>
<h2>DataSets</h2>
<p>In all of the examples above, the database queries have resulted in returning a variable I've called $DataSet. This $DataSet variable is actually an object instantiation of the DataSet class in the class.dataset.php file discussed above. The DataSet class is used to traverse the dataset that was created as a result of the query, and return the rows of data in either associative array or object format. Once again, flexibility is the purpose. Let's see some examples of what we can do with a DataSet object:</p>
<pre lang="php">// See how many rows were returned by the query:
$NumRows = $DataSet-&gt;NumRows();

// Get the first row in the dataset:
$FirstRow = $DataSet-&gt;FirstRow();
// And do something with it:
print_r($FirstRow);
// Would print:
stdClass Object
(
    [Name] =&gt; 'Civic'
    [Color] =&gt; 'White'
    [MaxSpeed] =&gt; '120'
    [Brand] =&gt; 'Honda'
    [Engine] =&gt; 'Sad'
)
// Or, get the first row as an associative array, instead:
$FirstRow = $DataSet-&gt;FirstRow('', DATASET_TYPE_ARRAY);
// And do something with it:
print_r($FirstRow);
// Would print:
Array
(
    [Name] =&gt; 'Civic'
    [Color] =&gt; 'White'
    [MaxSpeed] =&gt; '120'
    [Brand] =&gt; 'Honda'
    [Engine] =&gt; 'Sad'
)</pre>
<p>And for one more example on using DataSets, here's how one might decide to traverse a set of data:</p>


     <?php foreach ($DataSet->Result() as $Car) {
        echo "This car is ". $Car->Color.", it has a $Car->Engine.
           " engine, and it goes ". $Car->MaxSpeed."KM/h";
     } ?></pre>
     

<h1>Database Objects</h1>
<p>Most open-source web applications have database setup scripts that are simply a set of SQL instructions that you can inject directly into your database (typically mysql) to get going. Vanilla 1 was no exception to this rule. The benefit of this approach is that you can quickly and easily get your app up and running. The downside to this approach is that when it is time to upgrade the application to a newer version, you have to write extremely convoluted scripts to figure out what application version the user currently user has, or write scripts to examine database table structure to see what fields need to be removed, or what fields need to be added. Hell, it's even difficult to understand what I just wrote, let alone the code that would go along with it.</p>
<h2>The Database Structure Class</h2>
<p>Garden does not have any SQL install or update scripts. Instead, every application in garden has a structure.php file which can be used by either the Garden installer, or by the application management screen when enabling that application. The structure.php file contains a set of instructions on how to build the structure of the database. This file uses the DatabaseStructure class to define the structure of the database. The class itself is extremely simple to use. Like the database class, the DatabaseStructure class uses method chaining, and it contains methods to create/drop/rename tables, create/drop/rename table columns, and create/modify views.</p>
<h2>Tables &amp; Columns</h2>
<p>Each application's structure.php file resides in that application's "settings" folder (the same folder that contains the appliation's about.php file). So, the structure file for Garden resides in <code>/path/to/root/applications/garden/settings/structure.php</code>. Let's take a look at an example of how I create the user table in Garden:</p>
<pre lang="php">// User Table
$Construct-&gt;Table('User')
   -&gt;Column('UserID', 'int', 10, FALSE, NULL, 'primary', TRUE)
   -&gt;Column('PhotoID', 'int', 8, TRUE, NULL, 'key')
   -&gt;Column('Name', 'varchar', 20, FALSE, NULL, 'key')
   -&gt;Column('Password', 'varchar', 32)
   -&gt;Column('About', 'text', '', TRUE)
   -&gt;Column('Email', 'varchar', 200)
   -&gt;Column('ShowEmail', array('1', '0'), '', FALSE, '0')
   -&gt;Column('Gender', array('m', 'f'), '', FALSE, 'm')
   -&gt;Column('CountVisits', 'int', 8, FALSE, '0')
   -&gt;Column('CountInvitations', 'int', 2, FALSE, '0')
   -&gt;Column('InviteUserID', 'int', 10, TRUE)
   -&gt;Column('DiscoveryText', 'text', '', TRUE)
   -&gt;Column('Preferences', 'text', '', TRUE)
   -&gt;Column('Permissions', 'text', '', TRUE)
   -&gt;Column('Attributes', 'text', '', TRUE)
   -&gt;Column('DateSetInvitations', 'datetime', '', TRUE)
   -&gt;Column('DateOfBirth', 'datetime', '', TRUE)
   -&gt;Column('DateFirstVisit', 'datetime', '', TRUE)
   -&gt;Column('DateLastActive', 'datetime', '', TRUE)
   -&gt;Column('DateInserted', 'datetime')
   -&gt;Column('DateUpdated', 'datetime', '', TRUE)
   -&gt;Column('HourOffset', 'int', 2, FALSE, '0')
   -&gt;Set(TRUE, FALSE);</pre>
<p>The hardest part of understanding this SQL is knowing what each of the arguments in the "Column" method are. I've done my best to keep these arguments similar to the way they appear when writing a column definition in SQL. Let's take a look at all of the arguments:</p>
<pre lang="php">public function Column(
    $Name, 
    $Type, 
    $Length = '', 
    $Null = FALSE, 
    $Default = NULL, 
    $KeyType = FALSE, 
    $AutoIncrement = FALSE
) { }</pre>
<p><strong>Name (string):</strong> The name of the column to create. <strong>Type (mixed):</strong> The data type of the column to be created. If an array of values is provided, the type will be set as "enum" and the array will be assigned as the column's Enum property. <strong>Length (mixed, not required, default "empty"):</strong> The length of the column. <strong>Null (bool, not required, default FALSE):</strong> Does the column allow null values. <strong>Default (mixed, not required, default NULL):</strong> The default value of the column. If NULL is provided (default), there will be no default value. <strong>KeyType (string, not required, default FALSE):</strong> What type of key is this column on the table. Options are primary, key, and FALSE (not a key). <strong>AutoIncrement (bool, not required, default FALSE):</strong>A boolean value indicating if this column auto-increments. Once you master the arguments for the column method, building and altering tables is a breeze. The Set() method (used above to execute the creation of the user table) also has some important arguments:</p>
<pre lang="php">public function Set(
    $Explicit = FALSE, 
    $Drop = FALSE
) {}</pre>
<p>The Set method creates the table and columns specified with $this-&gt;Table() and $this-&gt;Column(). If no table or columns have been specified, this method will throw a fatal error. <strong>Explicit (bool, not required, default FALSE):</strong> If TRUE, and the table specified with $this-&gt;Table() already exists, this method will remove any columns from the table that were not defined with $this-&gt;Column(). <strong>Drop (bool, not required, default FALSE):</strong> If TRUE, and the table specified with $this-&gt;Table() already exists, this method will drop the table before attempting to re-create it. As you can imagine, these are some pretty powerful commands that you must pay close attention to. In 90% of my structure scripts, Explicit is TRUE, and Drop is FALSE. Despite this fact, I have kept both arguments FALSE by default so that tables are not dropped and columns are not removed if a user does not know what they are doing. As I mentioned, there are other methods available to you if you don't want to redefine an entire table, but you do want to add or remove columns (or drop entire tables). Those are: <strong>Drop</strong> (allows you to drop a table), <strong>RenameTable</strong>, <strong>DropColumn</strong>, and <strong>RenameColumn</strong>.</p>
<h2>Views</h2>
<p>Using the database class, you can also quickly and easily build a query and turn it into a view. Here is an example of building a view:</p>
<pre lang="php">$View = $Database-&gt;Select('rp.*')
   -&gt;Select('p.Name', '', 'Permission')
   -&gt;From('RolePermission rp')
   -&gt;Join('Permission p', 'rp.PermissionID = p.PermissionID')
   -&gt;GetSelect();
$Construct-&gt;View('vw_RolePermission', $View);</pre>
<h2>Benefits</h2>
<p>Why did I bother building this class? I originally got the idea because I found that I was keeping a SQL script that I would constantly make changes to, and re-run on the database, essentially wiping out my test data every time. It got me thinking about how upgrades are difficult because of database structure changes. I ended up writing this class in a very short amount of time, and then spending a lot of time turning my rather large SQL script into a structure.php file. I was delighted to discover that changes made to my structure.php file would quickly and easily apply to the database with a quick run of the file. So, I could easily add a column to a table definition, run my structure script, and go back to happily using the application, and making use of my new column, while all of my testing data remained intact. This means that when you release new versions of your applications, all you need to do is update your structure file (which you will likely be doing as you add features and fix bugs), and all database structure changes apply when the application is re-enabled by the user. This class can also be used by plugins to quickly and easily add (or remove) columns from tables (or even create tables). The sky is the limit. This class has gone far beyond my initial hopes. At this point I don't anticipate ever writing an upgrade script for any application in Garden. Everything should be handled by the application management screen, or the initial install script that comes prepackaged with Garden.</p>