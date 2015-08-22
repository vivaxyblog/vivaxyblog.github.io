#!/bin/sh
# vivaxy@15-08-22 13:37

console(){
    post="\033[0m"
    case "$1" in
        error)
            pre="\033[91m"
            ;;
        warn)
            pre="\033[93m"
            ;;
        info)
            pre="\033[92m"
            ;;
        debug)
            pre="\033[94m"
            ;;
        *)
            pre="\033[90m"
            ;;
    esac
    echo "${pre}$2${post}"
}

branch=`git rev-parse --abbrev-ref HEAD`
console info "current branch is \`${branch}\`"

case "$branch" in
    src)
        jekyll build
        git add .
        git commit -m $1
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
            git commit -m $1
            git push
            console info "done"
        else
            console erro "_site not found"
        fi
        ;;
    *)
        console info "nothing done"
        ;;
esac

git checkout src
