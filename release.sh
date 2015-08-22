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

if  [ ! -n "$1" ]
then
    read -p "enter commit message :" msg
else
    msg="$1"
fi

branch=`git rev-parse --abbrev-ref HEAD`
console info "current branch is \`${branch}\`"

case "$branch" in
    src)
        jekyll build
        console info "_site built"
        git add .
        git commit -m "${msg}"
        git push
        console info "branch \`src\` pushed"
        git checkout master
        console info "branch \`master\` checkouted"
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
            git commit -m "${msg}"
            git push
            console info "branch \`master\` pushed"
        else
            console erro "\`_site\` folder not found"
        fi
        ;;
    *)
        ;;
esac

git checkout src
console info "back to branch \`src\`"
