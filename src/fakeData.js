const { times, identity, map, toString, splitEvery, join, compose, curry } = require("ramda");

const getValue = curry((n, l) => {
    let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

    return compose(
        x => l + "-" + x,
        join(""),
        map(x => letters[parseInt(x)]),
        splitEvery(1),
        toString
    )(n)

});

const getObject = (val) => {
    const gv = getValue(val);

    return { "id": val, "type": gv("tp"), "name": gv("nm"), "color": gv("cl"), "price": ((val + 254) * 3) + "$", "manufacturer": gv("mn"), "availability": gv("av") }
}

const data = (n) => map(getObject, times(identity, n));

module.exports = { data };