---
layout: post
title: 提高项目可维护性的实践
tags: [project, maintainability]
---

随着部门成员的增加，一个项目不再是单人维护，而是可能会有多人维护。之前可以完全按照自己意愿和思路写的代码有时候会让别人难以理解。

为了改善这一状况，以下列出了几点实践。

1. 添加项目下的说明文档

    根目录下 README.md 文件在之前的项目中是 cortex init 命令生成好的，然而这个文件的存在是有其意义的。 我们需要发挥它的作用，把项目下的一些说明，教程，规范等添加进去。

    比如：ac-launching-static

    ```
    # 投放系统

    ## 进入开发

    - 初始化项目组件

        `> git submodule update --init`

    - 拉取 npm 依赖

        `> npm i`

    - 编译 css

        `> ./node_modules/.bin/stylus ./asset`

    ## 发布上线

    - `> grunt ftp`

    - 后端项目的 lion 配置中，修改 `midas-launch-web.static.launch` 的路径，改成最新的版本号
    ```

    维护说明文档占用了开发少许时间，却大大减少了新成员进入开发、了解项目的成本，能减少沟通成本，提高工作效率。

2. 添加项目下的接口文档

    ajax 是前后端沟通的工具，口头约定之后难以记住，因此需要将文档写下来，便于前后端单独完成开发。 同时这个文档也能解释项目下一段代码的逻辑，因此在项目的 doc/ajax.md 中将项目中使用到的接口都记录了下来。

    记录的格式是：

        # 接口用途

        `接口地址`

        ```
        前端发送的参数 {参数类型} 参数说明
        ```

        ```
        后端返回的参数 {参数类型} 参数说明
        ```

        其他说明

    比如：app-ac-slotmanage

        # 广告位管理/平台 查询平台列表

        `/midas/slot/ajax/searchPlatform`

        ```
        platformName {String} 平台名称
        companyName {String} 公司名称
        cooperationMode {Number} 公司名称
        pageIndex {Number} 第几页，从 1 开始
        pageSize {Number} 每页显示条数
        ```

        ```
        platformId {String|Number}
        name {String}
        companyName {String}
        cooperationMode {Number}
        ```

3. 项目下改动日志的维护

    添加 `CHANGELOG.md` 用以记录每次上线的改动点，便于追溯代码的来源和目的。 了解项目的历史有助于对整个项目的理解，尤其是一些由于一次需求不得已添加的黑暗代码。

4. 添加代码风格检查

    前端规范建立有效的减少了成员间的代码冲突，不同人之间不需要过多的沟通就能写出近乎类似的代码，同样也提高了代码的可维护性。

    为了提高大家对于规范的实践，因此加入 `eslint` 检查。 项目下添加 `eslintrc.json` ，其内容根据之前订制的规范而来。 添加 `husky` 依赖，配置 `git hook` ，能够在提交代码的时候检查风格问题，如果有问题，那么就停止本次提交。

5. 开发时达成共识，用统一的名称命名，并且将约定写入说明文档

    比如：app-ac-slotmanage

    ```
    # 名词解释

    - `platform` 平台，媒体所关联的平台

    - `media` 媒体，广告位所关联的媒体

    - `slot` 广告位

    - `tag` 集合，广告位集合

    - `template` 样式，广告位样式

    - `element` 元素，广告位样式中的元素
    ```

    从而避免了之前项目中广告位变量名成有多个的问题。

6. 添加 editor config 配置文件

    该配置文件能够统一编辑器的代码风格，便于在书写的时候就使用统一的代码风格。 editor config 拥有广泛的支持度，可以在常见的编辑器中生效。
