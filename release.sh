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

## provide commit message
if  [ ! -n "$1" ]
then
    read -p "enter commit message : " msg
else
    msg="$1"
fi
console debug "> commit message is ${msg}"

console debug "> git checkout src"
git checkout src
console debug "> jekyll build"
jekyll build
console info "_site built"
console debug "> git add ."
git add .
console debug "> git commit -m \"${msg}\""
git commit -m "${msg}"
console debug "> git push origin src"
git push origin src
console info "branch \`src\` pushed"
console debug "> git checkout master"
git checkout master
console info "branch \`master\` checkouted"
if [ -d "_site" ]
then
    console debug "> rm -rf index.html css image js 2011 2014 2015 2016"
    rm -rf index.html css image js 2011 2014 2015 2016
    console debug "> cp -r ./_site/* ./"
    cp -r ./_site/* ./
    console debug "> rm -rf _site"
    rm -rf _site
    console debug "> git add ."
    git add .
    console debug "> git commit -m \"${msg}\""
    git commit -m "${msg}"
    console debug "> git push origin master"
    git push origin master
    console info "branch \`master\` pushed"
else
    console erro "\`_site\` folder not found"
fi

console debug "> git checkout src"
git checkout src
console info "back to branch \`src\`"
