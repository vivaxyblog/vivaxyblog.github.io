---
layout: post
title: Alfred Workflows for MacOS
tags: [mac, alfred]
---

## Alfred

[Alfred](http://www.alfredapp.com/) is an award-winning productivity application for Mac OS X.

## Suggested sites for searching workflows

1. [http://www.alfredworkflow.com/](http://www.alfredworkflow.com/)

## My workflows list

1. Baidu Map

    ![map](/image/2014-11-30-alfred-workflows-for-macos/map.png)

2. Baidu Weather

    ![tq](/image/2014-11-30-alfred-workflows-for-macos/tq.png)

3. Chrome Bookmarks

    ![chrome](/image/2014-11-30-alfred-workflows-for-macos/chrome.png)

4. CopyPath

    ![path](/image/2014-11-30-alfred-workflows-for-macos/path.png)

5. Douban

    ![movie](/image/2014-11-30-alfred-workflows-for-macos/movie.png)

6. Emoji codes

    ![emoji](/image/2014-11-30-alfred-workflows-for-macos/emoji.png)

7. Encode / Decode

    ![encode](/image/2014-11-30-alfred-workflows-for-macos/encode.png)

8. Hash

    ![hash](/image/2014-11-30-alfred-workflows-for-macos/hash.png)

9. javascript api

    ![js](/image/2014-11-30-alfred-workflows-for-macos/js.png)

10. jQuery API

    ![jq](/image/2014-11-30-alfred-workflows-for-macos/jq.png)

11. Kill Process

    ![kill](/image/2014-11-30-alfred-workflows-for-macos/kill.png)

12. o3o

    ![o3o](/image/2014-11-30-alfred-workflows-for-macos/o3o.png)

13. Recent Downloads

    ![recent](/image/2014-11-30-alfred-workflows-for-macos/recent.png)

14. StackOverflow

    ![st](/image/2014-11-30-alfred-workflows-for-macos/st.png)

15. TerminalFinder

    ![tf](/image/2014-11-30-alfred-workflows-for-macos/tf.png)

16. VPN Toggle

    ![vpn](/image/2014-11-30-alfred-workflows-for-macos/vpn.png)

17. Wi-Fi Toggle

    ![wifi](/image/2014-11-30-alfred-workflows-for-macos/wifi.png)

18. Youdao Translate

    ![yd](/image/2014-11-30-alfred-workflows-for-macos/yd.png)

19. 百度云

    ![pan](/image/2014-11-30-alfred-workflows-for-macos/pan.png)

20. HTTP codes

    ![http](/image/2014-11-30-alfred-workflows-for-macos/http.png)

21. Mimetypes by Extension

    ![mime](/image/2014-11-30-alfred-workflows-for-macos/mime.png)

22. caniuse

    ![caniuse](/image/2014-11-30-alfred-workflows-for-macos/caniuse.png)

23. Open in Sublime

    ![subl](/image/2014-11-30-alfred-workflows-for-macos/subl.png)

24. PHP Manual

    ![php](/image/2014-11-30-alfred-workflows-for-macos/php.png)

25. QRCode 生成器

    ![qr](/image/2014-11-30-alfred-workflows-for-macos/qr.png)

26. iOS Simulator

    ![ios](/image/2014-11-30-alfred-workflows-for-macos/ios.png)

27. IP Address

    ![ip](/image/2014-11-30-alfred-workflows-for-macos/ip.png)

28. Todo

    ![todo](/image/2014-11-30-alfred-workflows-for-macos/todo.png)

29. Urban Dictionary

    ![urban](/image/2014-11-30-alfred-workflows-for-macos/urban.png)

30. Package Managers

    ![npm](/image/2014-11-30-alfred-workflows-for-macos/npm.png)

31. Colors

    ![rgb](/image/2014-11-30-alfred-workflows-for-macos/rgb.png)

32. Stopwatch

    ![stopwatch](/image/2014-11-30-alfred-workflows-for-macos/stop.png)


## Automatically paste to front most app

Workflows installed can be edited. We can add Automatically paste to front most app option to the workflows.

1. Add `Outputs > Copy to Clipboard`.

2. Add `{query}` in the text area.

3. Check `Automatically paste to front most app`.

4. Save.

5. Pull a line from the previous action.

6. Double click on the new line.

7. Select `Action Modifier` `cmd`.

8. Set `Modifier Subtext` to `Paste {query} to front most App`.

9. Save.

Now we can paste result to the front app, with cmd + return.

## Add notifications

1. Add `Outputs > Post Notification`.

2. Check `Only show if passed in argument has content`.

3. Set `Title` to `Added to Clipboard`.

4. Set `Text` to `{query}`.

5. Draw a line from the previous action.

6. Save.
