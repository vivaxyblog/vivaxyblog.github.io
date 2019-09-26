---
layout: post
title: Alfred 4 Workflow Open in VSCode
tags: [alfred, alfred-workflow, workflow, productivity, vscode, code, open-in-vscode, vivaxy, alfred-4]
---

## Feature

![Alfred 4 Workflow Open in VSCode](/assets/2019-08-14-alfred-workflow-open-in-vscode/alfred-workflow-open-in-vscode.png)

- Search projects, press `enter` to open in VSCode.
- Search projects, press `command + enter` to reveal in Finder.
- Open in VSCode the folder, which selected in Finder.

## Installation

- Download [Alfred Workflow 4 Open in VSCode](https://www.dropbox.com/s/8tf7vae3djsos55/Open%20in%20VSCode.alfredworkflow?dl=0)
- Open the workflow in Alfred.
- Set workflow environment `wds` to your project base folders (split with `,`).
    e.g. `wds`: `/Users/vivaxy/Developers/github,/Users/vivaxy/Developers/gitlab`.
    Workflow searches only first level folders, so make sure `wds` point to them.
    `wds` stands for `working directories`

## Usage

Open Alfred.

- Type `code ` (with space) to search. Press enter to open the selected project in VSCode. Hold `command` and press `enter` to reveal in Finder.
- Select a folder in Finder, type `code` (without space) and `enter` to open this folder in VSCode.

## Reference

- [alfy](https://github.com/sindresorhus/alfy)
- [Alfred Workflow Open in WebStorm - Blog Post](/2015/06/02/alfred-workflow-open-in-webstorm.html)
- [Alfred 4 Workflow Open in WebStorm - Alfred 4 Workflow](https://www.dropbox.com/s/o4olpcovhcdxgw5/Open%20in%20WebStorm.alfredworkflow?dl=0)
