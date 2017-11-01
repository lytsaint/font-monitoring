const getBrowerType = (type) => {

    if (!type) {
        return;
    }

    var explorer = type;

    let browType = ['MSIE', 'Firefox', 'Chrome', 'Opera', 'Safari', 'Netscape', 'otherBrowser'];
    let brower;

    //ie 
    if (explorer.indexOf(browType[0]) >= 0) {
        brower = browType[0];
    }
    //firefox 
    else if (explorer.indexOf(browType[1]) >= 0) {
        brower = browType[1];
    }
    //Chrome
    else if (explorer.indexOf(browType[2]) >= 0) {
        brower = browType[2];
    }
    //Opera
    else if (explorer.indexOf(browType[3]) >= 0) {
        brower = browType[3];
    }
    //Safari
    else if (explorer.indexOf(browType[4]) >= 0) {
        brower = browType[4];
    }
    //Netscape
    else if (explorer.indexOf(browType[5]) >= 0) {
        brower = browType[5];
    } else {
        brower = browType[6];
    }
    return brower
};

module.exports = getBrowerType;