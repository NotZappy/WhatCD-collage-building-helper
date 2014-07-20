# Changelog
**0.1**
Initial release

**0.15**
Added SSL support.
Got rid of annoying popup in favor of checkmark.

**0.16**
Fixed a major bug where it did not include torrents.php*

**0.20**
Added links to collage when necessary.
Added better support on edit, manage, search, browse for collages.
Added error checking in case you change/remove the active collage and then click on add-to-collage image without refreshing torrents page.
Fixed bug if you click on album art on a collage then set active collage.
Changed update to check for updates only on collage pages and overall made extension less obtrusive when not in use.
Added support for collage.php (I think that's the old version of collages.php).

**0.21**
Auto-scroll down the torrents.php page, so when you search for something it automatically goes towards the torrents.
You can change this in the options menu: right click greasemonkey icon at bottom right, user script commands, "window jump"

**0.30**
Added a lot of stuff on the manage torrents page.  The much needed "Edit all" button has been added.
There is also an "operation" button that allows you to perform operations on a selected range of torrents.
Operations include +, -, *, /, reverse all, sort by year, and find missing torrents.

**0.31**
Added auto-sort alphabetically operation.  Changed image for adding something to a collage.
Added support for most pages (artist, snatched/uploaded/seeding/leeching lists).  Fixed bug with year sort.

**0.32**
Fixed bug that broke the script.
Added authkey reset (useful for password changes)

**0.33**
Fixed authkey bug

**0.34**
Really fixed authkey bug this time :(

**0.35**
Firefox 4 update

_Development up to this point by captZEEbo._

**0.36** (2012-08-29)
* Fixed    @include URLs and other things related to https://what.cd

**0.40** (2012-10-27)
* Added    Adding torrents to the collage from torrent group and notification pages
* Added    Chromium support (with Tampermonkey)
* Fixed    Script not running on uploaded/snatched pages 2 and above
* Removed  Auto-scrolling on torrents.php
* Removed  Script update since current versions of both GreaseMonkey and Tampermonkey have built-in auto-update functions

**0.5** (2012-10-29)
* Changed  Icons replaced by better-looking ones
* Fixed    Adding torrents from torrent group pages not working
* Fixed    Add icon displaying for each torrent group entry on artist pages
* Fixed    Math Range button not getting hidden in Chromium

**1.0** (2013-02-27)
* Added    Adding torrents from bookmarks and notification pages
* Added    Caching collage contents and displaying a tick on the various pages if a torrent is in the collage already
* Added    Removing torrents from the various pages (by clicking on the tick)
* Changed  Display of the active collage and the links on collage pages
* Removed  Sorting and reverse operations from the math range tool
* Added    Error handling (permission issues, locked collage etc.)
* Changed  Replaced the image buttons (Edit All, Math Range, Operation) by real buttons</pre>

**1.0.1** (2013-03-05)
* Changed  Improved error handling
