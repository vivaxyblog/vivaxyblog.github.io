#!/usr/bin/env bash
# vivaxy@15-08-22 13:37

log(){
    post="\033[0m"
    case "$1" in
        error)
            pre="\033[31m"
            ;;
        warn)
            pre="\033[33m"
            ;;
        info)
            pre="\033[36m"
            ;;
        debug)
            pre="\033[94m"
            ;;
        *)
            pre="\033[37m"
            ;;
    esac
    echo -e "${pre}$2${post}"
}

## provide commit message
if  [ ! -n "$1" ]
then
    log info "enter commit message: \c"
    read -e msg
else
    msg="$1"
fi
log debug "> commit message is ${msg}"

log debug "> git checkout src"
git checkout src
log debug "> jekyll build"
jekyll build
log info "_site built"
log debug "> git add ."
git add .
log debug "> git commit -m \"${msg}\""
git commit -m "${msg}"
log debug "> git push origin src"
git push origin src
log info "branch \`src\` pushed"
log debug "> git checkout master"
git checkout master
log info "branch \`master\` checkouted"
if [ -d "_site" ]
then
    log debug "> rm -rf index.html css image js 2011 2014 2015 2016"
    rm -rf index.html css image js 2011 2014 2015 2016
    log debug "> cp -r ./_site/* ./"
    cp -r ./_site/* ./
    log debug "> rm -rf _site"
    rm -rf _site
    log debug "> git add ."
    git add .
    log debug "> git commit -m \"${msg}\""
    git commit -m "${msg}"
    log debug "> git push origin master"
    git push origin master
    log info "branch \`master\` pushed"
else
    log erro "\`_site\` folder not found"
fi

log debug "> git checkout src"
git checkout src
log info "back to branch \`src\`"
