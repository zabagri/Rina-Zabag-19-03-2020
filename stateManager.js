var stateModule = (function () {
    var state;

    var pub = {};

    pub.changeState = function (newstate) {
        state = newstate;
    };

    pub.getState = function() {
        return state;
    }

    return pub;
}());

export default stateModule