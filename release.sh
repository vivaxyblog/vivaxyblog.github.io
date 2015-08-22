#!/bin/sh
# vivaxy@15-08-22 13:37

console(){
    post="\033[0m"
    case $1 in
        error)
            pre="\033[31m"
            ;;
        warn)
            pre=""
            ;;
        info)
            pre-"\033[36m"
            ;;
        debug)
            pre="\033[30"
            ;;
        *)
            pre="\033[37m"
            ;;
    esac
    echo ${pre}$2${post}
}

branch=`git rev-parse --abbrev-ref HEAD`
echo "\033[0mcurrent branch is \`${branch}\`\033[0m"

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
            echo "\033[0mdone\033[0m"
        fi
        ;;
    *)
        echo "\033[0mnothing done\e[0m"
        ;;
esac

git checkout src
