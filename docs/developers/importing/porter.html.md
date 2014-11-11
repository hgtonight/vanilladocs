---
title: Vanilla Porter
layout: docs
categories: ["Developers","Importing"]
---

## Using Vanilla Porter

This topic deals with importing your old forum into Vanilla 2 using the Vanilla 2 [export tool](http://vanillaforums.org/addon/porter-core). The process is basically three steps:

1. Export your old forum data with the Vanilla 2 [export tool](http://blog.vanillaforums.com/wp-content/uploads/2010/07/VanillaPorter.png).
2. Create a new Vanilla 2 installation.
3. Import the file from step 1 to Vanilla 2

### Export Your Old Forum Data

We’ve made a tool that you can use to put your old forum into a format that Vanilla 2 can import. We currently support [these platforms](/developers/importing/support). Here is how you use it:

1. Grab the Vanilla 2 exporter [here](http://vanillaforums.org/addon/porter-core). The download is one file that you will copy to your server and run.
2. Unzip the file to a directory in your old forum. For example, if your forum is located in **/www/mysite/myforum** then you would unzip the file to **/www/mysite/myforum/vanilla2export.php**.By default, the exporter will prompt you to save your export file. If your forum has a lot of data, it might make more sense to have the exporter save your data to a file on your server. If this is the case, you will need to place the vanilla2export.php file in a directory that is writable. Most forums have a **/files**or **/uploads** directory for this.
3. Browse to vanilla2export.php in your web browser. You should see a page like this:![Vanilla Exporter UI](http://blog.vanillaforums.com/wp-content/uploads/2010/07/VanillaPorter.png)
4. You will need to know some information about your database in order to do the export. If you can’t remember, try looking at your forum’s configuration file. Once you’ve entered the information click **Begin Export**.
5. A single file should be generated. This is the file that will be imported into Vanilla 2.

### Create a New Vanilla 2 Installation

In order to import your data, you will need a fresh installation of Vanilla 2. When you do the import, all data in your fresh installation will be overwritten, so make sure you don’t have any discussions you want to keep there.

### Import Your Forum

Vanilla 2 has an import utility in its dashboard. This is what you’ll use to import your forum.

1. Go to the import tool located in your dashboard under **Site Settings** \> **Import**.
2. There are only a few inputs required. You need to upload the file and supply the username and password of the old forum’s administrative user. If your file is large (say over 5MB), you might want to upload the file manually to your **/uploads** directory using ftp.
3. When you are ready to go click **Upload File** to get started.
4. Once the file has been uploaded you’ll see a short summary. Click **Start Import** to start the import.
5. The import should run on its own now. The length of time it takes depends on how much data you have to import. However, you will see a status update as the import progresses.
6. Once the import is complete your data is now ready to go, however you might want to go through your site’s settings to update some of the stuff that wasn’t imported. One of the places you’ll definitely want to check is **Roles & Permissions** or else no one will have permission to view the discussions you just imported.
7. At this point you’re done. Congratulations! Your Vanilla 2 installation is ready to go with your old forum’s data.

### Notes

You can port your attachments over to Vanilla 2. To do this you must enable the File Upload plugin before importing your data. You them must copy them to Vanilla 2's `uploads` folder.
