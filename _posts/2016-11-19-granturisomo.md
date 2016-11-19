---
layout: post
title: GT, Might be the simplest generator tool for scaffolding ever
tag: project
---

![gt](/image/2016-11-19-granturisomo/gt.png)

GT, aka granturismo, also the generator tool, might be the simplest generator tool for scaffolding ever.

GT is for someone who suffered from yeoman. GT is easier to set up in scaffold and easier for users to generate the project from the scaffold.

In GT, we set up the scaffold projects as a git repository. Each time you create a project you're using the newest scaffold.

GT has a list of scaffolds, in which you can choose from to quickly set up your new projects.

GT will optimize your list to make your favorite scaffold much more easier to reach.

As for developer, who makes scaffold, you needs to upload your scaffold onto public git repository, set up `gt.js` in your scripts directory. You might need to provide access to your scaffold by http or https. This makes the users easier to clone from git.

`gt.js` exports an init method, to copy or update scaffold files into generated project. The init method takes information from the GT client. See https://github.com/vivaxy/granturismo for more information.

I have already made 2 scaffolds.

* [vivaxy/react-scaffold](https://github.com/vivaxy/react-scaffold) react, redux, router...
* [vivaxy/front-end-scaffold](https://github.com/vivaxy/front-end-scaffold) eslint...

Hopefully, a better tool for a better world.

## Project structure

![flowchart](/image/2016-11-19-granturisomo/flowchart.png)

## Project repository

[granturismo](https://github.com/vivaxy/granturismo)
