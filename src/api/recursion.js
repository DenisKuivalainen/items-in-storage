const { isArray } = require("ramda-godlike");

// recursion:: (*...) -> Promise
const recursion = (request) => async (arg) => {
    let depth = 0;

    // Check recursion depth
    const checkDepth = () => {
        depth++;
        if(depth > 5) throw "Too much recursion";
    }

    const fetchData = async () => {
        checkDepth();
        let requestedData = await request(arg);
        
        return isArray(requestedData) ?
            requestedData :
            await fetchData();
    }
    
    return await fetchData();
}

module.exports = { recursion };