---
layout: post
title: Git Tag And Push Git Tag
tags: [git, tag, annotated-tag, lightweight-tag, follow-tags]
---

- Why my git tags cannot be pushed sometimes?
- What's the difference between `git push --follow-tags` and `git push --tag`?

There are concepts beneath the questions actually. Firstly, We will talk about `lightweight tag` and `annotated tag`.

## Lightweight Tag And Annotated Tag.

Quote from [Git - Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

> Git supports two types of tags: lightweight and annotated.
>
> A lightweight tag is very much like a branch that doesn’t change — it’s just a pointer to a specific commit.
>
> Annotated tags, however, are stored as full objects in the Git database. They’re checksummed; contain the tagger name,
> email, and date; have a tagging message; and can be signed and verified with GNU Privacy Guard (GPG). It’s generally
> recommended that you create annotated tags so you can have all this information; but if you want a temporary tag or
> for some reason don’t want to keep the other information, lightweight tags are available too.

As we can see, annotated tags are the tags that really matters. They should be taking good care of.

### How To Tag?

```
git tag <tagname>                 => lightweight tag
git tag -a <tagname>              => annotated tag, will prompt for mesage
git tag -a -m <msg> <tagname>     => annotated tag
git tag -m <msg> <tagname>        => annotated tag
```

### What Does `npm version` Do?

`npm version` will tag package versions like this:

Quote from [cli/version.js · npm/cli](https://github.com/npm/cli/blob/39d473adf38a31954d0922f5cc6451ffd59fa362/lib/version.js#L310)

> ```js
> // ...
> const flagForTag = signTag ? '-sm' : '-m'
> // ...
> stagePackageFiles(localData, options).then(() => {
>   return git.exec(commitArgs, options)
> }).then(() => {
>   if (!localData.existingTag) {
>     return git.exec([
>       'tag', npm.config.get('tag-version-prefix') + version,
>       flagForTag, message
>     ], options)
>   }
> }).nodeify(cb)
> // ...
> ```

It is really an annotated tag.

### So How Do We Push Tags?

There are two ways of pushing tags:

- `git push --follow-tags`
- `git push --tags`

Quote from [How do you push a tag to a remote repository using Git? - Stack Overflow](https://stackoverflow.com/questions/5195859/how-do-you-push-a-tag-to-a-remote-repository-using-git)

> `git push --follow-tags`
>
> It pushes both commits and only tags that are both:
>   - annotated
>   - reachable (an ancestor) from the pushed commits
>
> This is sane because:
>   - you should only push annotated tags to the remote, and keep lightweight tags for local development to avoid tag clashes. See also: [What is the difference between an annotated and unannotated tag?](https://stackoverflow.com/questions/11514075/what-is-the-difference-between-an-annotated-and-unannotated-tag)
>   - it won't push annotated tags on unrelated branches
>
> It is for those reasons that --tags should be avoided.

How do we push tags? `git push --follow-tags`!

## In Conclusion

When you can't push tags, you probably:

- are using lightweight tag, and `git push --follow-tags`.

While you can push tags, you probably:

- are using lightweight tag, and `git push --tags`. (Not recommended!)
- are using annotated tag, and `git push --follow-tags`.

## Reference

- [How do you push a tag to a remote repository using Git? - Stack Overflow](https://stackoverflow.com/questions/5195859/how-do-you-push-a-tag-to-a-remote-repository-using-git)
- [Git - Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [cli/version.js · npm/cli](https://github.com/npm/cli/blob/39d473adf38a31954d0922f5cc6451ffd59fa362/lib/version.js#L310)
- [Git - git-push Documentation](https://git-scm.com/docs/git-push#Documentation/git-push.txt---tags)
