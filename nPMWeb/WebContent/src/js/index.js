//iframe이 로드될때마다 사이즈 조절
//var baseHeight = document.getElementById("iframe1").scrollHeight; //기본사이즈세팅

function resizeHeight(obj) {
    thisHeight = obj.contentWindow.document.body.scrollHeight;

    if (thisHeight > baseHeight) {
        obj.height = thisHeight;
    } else {
        //기본사이즈보다 작아도 기본사이즈 유지
        obj.height = baseHeight;
    }
}
function setheight() {
    if (parent.document.getElementById("iframe1")) {
        parent.document.getElementById("iframe1").height = document.body.clientHeight;
    }
}