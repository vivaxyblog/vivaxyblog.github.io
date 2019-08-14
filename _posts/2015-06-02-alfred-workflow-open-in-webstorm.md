---
layout: post
title: Alfred Workflow Open in WebStorm
tags: [alfred]
---

## ScreenShots

![find folder](/assets/2015-06-02-alfred-workflow-open-in-webstorm/find-folder.png)
![find folder](/assets/2015-06-02-alfred-workflow-open-in-webstorm/open-selected-file.png)

## Supported

- Type `ws`, start searching files or folders, press `enter`, open it in WebStorm.

- Select a file or folder in Finder, type `ws`, open it in WebStorm.

- Open a folder in Finder, type `ws`, open it in WebStorm.

- Select multiple files in Finder, type `ws`, open it in WebStorm.

## Steps

### Create Blank Workflow

Workflow Name: `open in WebStorm`

Description: `open in WebStorm`

Category: `productivity`

Drop a WebStorm icon into it.

You can download icon from [official website](https://www.jetbrains.com/products.html)

### Add Keyword inputs

Keyword: `ws`

Select `no arguments`

Title: `Open in WebStorm`

Subtext: `Open in WebStorm`

### Add Run NSAppleScript action

AppleScript:

```as
on alfred_script(q)

	tell application "Finder"
		set theSelection to (get selection)
		if length of theSelection is equal to 1 then
			set pathList to {}
			repeat with anItem in theSelection
				set pathList to quoted form of POSIX path of (anItem as text)
			end repeat
		else
			set pathList to (quoted form of POSIX path of (folder of the front window as alias))
		end if
	end tell

	tell application "System Events"
		do shell script "/usr/local/bin/wstorm " & pathList
	end tell

end alfred_script
```

### Drag line between them

### Add File Filter input

Keyword: `ws`

Check with space

Placeholder Title: `Open in WebStorm`

Placeholder Subtext: `Open file matching '{query}' in WebStorm.`

Drag any folder into File Types

You can specify path in Search Scope

### Add Run Script action

Language: `/bin/bash`

Escaping: `Double Quotes`

Scripts:

```sh
/usr/local/bin/wstorm "{query}"
```

### Drag a line between them
