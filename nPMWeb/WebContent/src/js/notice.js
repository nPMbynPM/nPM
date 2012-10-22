function setheight() {
    if (parent.document.getElementById("iframe1")) {// 유동성있는 처리
        parent.document.getElementById("iframe1").height = document.body.scrollHeight;
    }
}