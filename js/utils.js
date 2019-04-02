const PI = Math.PI;

function toRadians(degrees){
    return degrees * PI/180;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntTwoRanges(min1, max1, min2, max2) {
    var intRange1 = getRandomInt(min1, max1);
    var intRange2 = getRandomInt(min2, max2);

    return Math.random() > 0.5 ? intRange1 : intRange2; 
}

function getAngleBetween(from, to) {
    var dx = from.x - to.x;
    var dy = from.y - to.y;
    return Math.atan2(dx, dy);
}

function getVectorMagnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

function normalizeVector(vector) {
    var magnitude = getVectorMagnitude(vector);
    return {x: vector.x/magnitude, y:vector.y/magnitude};
}