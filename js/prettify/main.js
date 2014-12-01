/**
 * @since 14/12/1 下午7:05
 * @author vivaxy
 */
var preList = document.getElementsByTagName('pre');
for (var i=0; i<preList.length; i++){
    preList[i].classList.add('prettyprint');
}
prettyPrint();