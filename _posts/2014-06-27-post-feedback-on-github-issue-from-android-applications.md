---
layout: post
title: Post Feedback on Github Issue from Android Applications
---

## Create a github account.

Visit [github.com](github.com).

## Create a new authorization.

See [https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization](https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization).

```sh
# Enter YOURUSERNAME.
$ curl -u "YOURUSERNAME" -X POST -d '{"note":"feedback"}' https://api.github.com/authorizations
# Enter YOURPASSWORD.
```

Response:

```json
{
  "id": 1234,
  "url": "https://api.github.com/authorizations/*******",
  "app": {
    "name": "feedback (API)",
    "url": "https://developer.github.com/v3/oauth_authorizations/",
    "client_id": "00000000000000000000"
  },
  "token": "YOURTOKEN",
  "note": "feedback",
  "note_url": null,
  "created_at": "2014-06-27T01:49:33Z",
  "updated_at": "2014-06-27T01:49:33Z",
  "scopes": [
  ]
}
```

## Setup generated token

Account settings > [Applications](https://github.com/settings/applications) > Personal access tokens > Edit > Select scopes: public_repo > Update token

## Post an issue using curl command line.

```sh
# Enter YOURTOKEN USERNAME REPONAME.
# Repository user could be different from the previous authorised user, and it is safer to be different.
$ curl -X POST -u YOURTOKEN:x-oauth-basic -H "Content-Type: application/x-www-form-urlencoded" -d '{"title":"test token"}' https://api.github.com/repos/USERNAME/REPONAME/issues
```

## Add code to your android application.

```java
public Boolean sendFeedback(String content) throws Exception {

    // String systemInfo = new SystemInfo().getSysInfoString();

    // See https://developer.github.com/v3/issues/#create-an-issue.
    // Replace USERNAME REPONAME with your project owner repo.
    String url = "https://api.github.com/repos/USERNAME/REPONAME/issues";

    // Post a http request in json.
    HttpPost httppost = new HttpPost(url);
    JSONObject para = new JSONObject();
    para.put("title", content);
    // para.put("body", "Feedback from Android device.\n" + systemInfo);

    // Set StringEntity to HTTP.UTF_8 in case of Chinese garbled.
    StringEntity se = new StringEntity(para.toString(), HTTP.UTF_8);
    httppost.setEntity(se);

    // Replace YOURTOKEN with your generated token;
    httppost.setHeader("Authorization", "token YOURTOKEN");
    httppost.setHeader("Accept", "application/json");

    // Content-type must be set as application/x-www-form-urlencoded.
    // And add charset=UTF-8 in case of Chinese garbled.
    httppost.setHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

    // Read response.
    // If exceptions throwed or false returned, submittal fails.
    HttpResponse response = new DefaultHttpClient().execute(httppost);
    Log.v("-------", "getStatusCode: " + response.getStatusLine().getStatusCode());
    if (response.getStatusLine().getStatusCode() == 201) {
        Log.v("-------", "response: " + EntityUtils.toString(response.getEntity()));
        return true;
    } else return false;
}
```

## Http post should be in a new thread apart of current activity.

```java
// Add a runnable to start your post.
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        TextView tv = (TextView) findViewById(R.id.feedback_container);
        try {
            Boolean success = fu.sendFeedback(tv.getText().toString());

            // Toast not made in current activity thread should be added to the looper.
            Looper.prepare();
            if (success) Toast.makeText(HomeActivity.ha, R.string.feedback_success, Toast.LENGTH_LONG).show();
            else Toast.makeText(HomeActivity.ha, R.string.feedback_error, Toast.LENGTH_LONG).show();
            Looper.loop();
        } catch (Exception e) {
            Looper.prepare();
            Toast.makeText(HomeActivity.ha, R.string.feedback_error, Toast.LENGTH_LONG).show();
            Looper.loop();
            e.printStackTrace();
        }
    }
};
```

## Call this in current activity to start your post.

`new Thread(runnable).start();`

## Use github commit message to close issues.

[fix #ISSUEID](https://help.github.com/articles/closing-issues-via-commit-messages)
