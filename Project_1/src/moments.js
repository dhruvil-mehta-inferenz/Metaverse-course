let moments = {}

document.addEventListener("keyup",up);
document.addEventListener("keydown",down);

function isPressed(keyCode) {
    return moments[keyCode] ? moments[keyCode] : false;
}
function down(e) {
    if (moments[e.keyCode]) return;
    moments[e.keyCode] = true;
    console.log("ON Key Down:->", e.key, ",The Key:Code", e.keyCode);
}
function up(e) {
    moments[e.keyCode] = false;
    console.log("ON Key Up:->", e.key, ",The Key:Code", e.keyCode);
}

export{down,up,isPressed};