---
layout: post
title: Preload Images
---

Sites with big images always encounter slow loading.

Now i introduce to you a brand new utility: `preload-images`.

This will make your sites faster than ever.

`preload-images` will build small images for `<img>` with `data-preload` like `<img src="1.jpg" data-preload>`.

And users will see some blur images first, then full clear images will be shown!

## How to install it

- Install [node](http://nodejs.org/).

    `> node -v`
    
    `> ` means in your terminal

- Install [`preload-images`](https://www.npmjs.com/package/preload-images).

    `> [sudo] npm i -g preload-images`
    
    `> preload -v`
    
## How to use it

Two steps.

- Modify your html, add `data-preload` attribute to your images, which you want it to load faster.

- In your project root directory `> preload`.

## How this works

- Load small images first.

- After your html and scripts loaded, load original images; and after those are downloaded to users' computer, replace small images.

## What changed in your project

- Images tags with `data-preload` attribute will be changed in three attributes `data-preload-origin`, `data-preload` and `src`.

- Small images will be built to `preload` folder beneath your original images.

- A small peace of script will be appended to your html body at the bottom.

## How to report problems

Submit new issues [here](https://github.com/event-lab/preload-images/issues)

## How to contribute

Fork [me](https://github.com/event-lab/preload-images)
