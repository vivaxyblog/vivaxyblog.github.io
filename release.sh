#!/bin/sh
# vivaxy@15-08-22 13:37
branch=`git rev-parse --abbrev-ref HEAD`
echo "current branch is \`${branch}\`"

case "$branch" in
    src)
        jekyll build
        git add .
        git commit -m "update"
        git push
        git checkout master
        if [ -d "_site" ]
        then
            rm -rf index.html
            rm -rf css
            rm -rf image
            rm -rf js
            rm -rf 2011
            rm -rf 2014
            rm -rf 2015
            rm -rf 2016
            cp -r ./_site/* ./
            rm -rf _site
            git add .
            git commit -m "update"
            git push
            echo "done"
        fi
        ;;
    *)
        echo "nothing done"
        ;;
esac

git checkout src
