function setheight() {
    if (parent.document.getElementById("iframe1")) {
        parent.document.getElementById("iframe1").height = document.body.scrollHeight;
    }
}