VanillaDocs
===========

##Organization

The "Features" folder is for all users of Vanilla Forums but descriptions may include services and features specific to the VanillaForums.com hosted service. 

The "Developers" folder is for all developers implementing their own code solutions for Vanilla Forums but may include descriptions of solutions that are not possible or disallowed on VanillaForums.com hosted service. Clients of VanillaForums.com should consult support or their sales representative for guidance.

##Formatting

Every doc file must end in ".md" and be formatted in Markdown. The first line must be a unique, URL-formatted slug (lowercase letters, numbers & hyphens).

The config file in each folder is automatically generated by the VanillaDocs addon to maintain folder/category associations. Please do not ever edit them. There is no need to create them manually.

Folder names will be used as Category names (and their hierarchy), and file names will be used as Discussion names (minus their suffix). It is safe to rename files & folders and reorganize them at any time. 

Folder names prefixed with an underscore will be ignored.

A file starting with "Introduction" will become the index file for a folder in the special docs viewer. Please name files keeping in mind they will be discussion names and should be appropriately descriptive.

Please use H2 (## in Markdown) as your top-level headings in each file.

##Contributing

Please submit edits & additions as pull requests against the appropriate branch. Once we have sufficient content, we will branch open source release versions. Master branch will reflect vanillaforums.com production.