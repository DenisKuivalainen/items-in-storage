const { includes } = require("ramda");
const { viewOnPath } = require("ramda-godlike");
const { getItems } = require("../src/api/GetCategoryItems");
const { config } = require("../src/config");

async function apiItems(req, res) {
    const category = viewOnPath(["query", "category"], req);

    const response = (status, message) => {
        // res.writeHead(status);
        res.write(message);
        res.end();
        console.log("done")
    }

    const getData = async (catgr) => {
        try{
            let items = await getItems(catgr);
            let stringItems = JSON.stringify(items);
            response(200, stringItems);
        } catch(e) {
            console.log(e);
            response(500, "Internal server error! >:c");
        }
    }

    return includes(category, config("categories")) ? 
        await getData(category) :
        response(404, "Not found");
}

module.exports =  { apiItems };