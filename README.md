# [vivaxyblog.github.io](https://vivaxyblog.github.io)

## 规范

### 标题

- h1 为文章标题，文章内容不能包含 h1 ，只能使用 h2 ~ h5

### 更新文章

- 修改 `js/common/sw.js` 中的 `CACHE_NAME`

## 安装环境

```sh
gem install bundler
bundle install
npm install
```

## 本地测试

```sh
npm run build
bundle exec jekyll serve
```

## 本地构建

```sh
bundle exec jekyll build
```
