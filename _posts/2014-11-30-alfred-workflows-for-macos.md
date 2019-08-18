---
layout: post
title: Alfred Workflows for MacOS
tags: [macOS, alfred, workflow, productivity]
---

## Alfred

[Alfred](http://www.alfredapp.com/) is an award-winning productivity application for Mac OS X.

## Suggested sites for searching workflows

1. [http://www.alfredworkflow.com/](http://www.alfredworkflow.com/)

## My workflows list

1. Baidu Map

    ![map](/assets/2014-11-30-alfred-workflows-for-macos/map.png)

2. Baidu Weather

    ![tq](/assets/2014-11-30-alfred-workflows-for-macos/tq.png)

3. Chrome Bookmarks

    ![chrome](/assets/2014-11-30-alfred-workflows-for-macos/chrome.png)

4. CopyPath

    ![path](/assets/2014-11-30-alfred-workflows-for-macos/path.png)

5. Douban

    ![movie](/assets/2014-11-30-alfred-workflows-for-macos/movie.png)

6. Emoji codes

    ![emoji](/assets/2014-11-30-alfred-workflows-for-macos/emoji.png)

7. Encode / Decode

    ![encode](/assets/2014-11-30-alfred-workflows-for-macos/encode.png)

8. Hash

    ![hash](/assets/2014-11-30-alfred-workflows-for-macos/hash.png)

9. javascript api

    ![js](/assets/2014-11-30-alfred-workflows-for-macos/js.png)

10. jQuery API

    ![jq](/assets/2014-11-30-alfred-workflows-for-macos/jq.png)

11. Kill Process

    ![kill](/assets/2014-11-30-alfred-workflows-for-macos/kill.png)

12. o3o

    ![o3o](/assets/2014-11-30-alfred-workflows-for-macos/o3o.png)

13. Recent Downloads

    ![recent](/assets/2014-11-30-alfred-workflows-for-macos/recent.png)

14. StackOverflow

    ![st](/assets/2014-11-30-alfred-workflows-for-macos/st.png)

15. TerminalFinder

    ![tf](/assets/2014-11-30-alfred-workflows-for-macos/tf.png)

16. VPN Toggle

    ![vpn](/assets/2014-11-30-alfred-workflows-for-macos/vpn.png)

17. Wi-Fi Toggle

    ![wifi](/assets/2014-11-30-alfred-workflows-for-macos/wifi.png)

18. Youdao Translate

    ![yd](/assets/2014-11-30-alfred-workflows-for-macos/yd.png)

19. 百度云

    ![pan](/assets/2014-11-30-alfred-workflows-for-macos/pan.png)

20. HTTP codes

    ![http](/assets/2014-11-30-alfred-workflows-for-macos/http.png)

21. Mimetypes by Extension

    ![mime](/assets/2014-11-30-alfred-workflows-for-macos/mime.png)

22. caniuse

    ![caniuse](/assets/2014-11-30-alfred-workflows-for-macos/caniuse.png)

23. Open in Sublime

    ![subl](/assets/2014-11-30-alfred-workflows-for-macos/subl.png)

24. PHP Manual

    ![php](/assets/2014-11-30-alfred-workflows-for-macos/php.png)

25. QRCode 生成器

    ![qr](/assets/2014-11-30-alfred-workflows-for-macos/qr.png)

26. iOS Simulator

    ![ios](/assets/2014-11-30-alfred-workflows-for-macos/ios.png)

27. IP Address

    ![ip](/assets/2014-11-30-alfred-workflows-for-macos/ip.png)

28. Todo

    ![todo](/assets/2014-11-30-alfred-workflows-for-macos/todo.png)

29. Urban Dictionary

    ![urban](/assets/2014-11-30-alfred-workflows-for-macos/urban.png)

30. Package Managers

    ![npm](/assets/2014-11-30-alfred-workflows-for-macos/npm.png)

31. Colors

    ![rgb](/assets/2014-11-30-alfred-workflows-for-macos/rgb.png)

32. Stopwatch

    ![stopwatch](/assets/2014-11-30-alfred-workflows-for-macos/stop.png)


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
