import { includes } from "ramda";
import { viewOnPath } from "ramda-godlike";
import { getItems } from "../../src/api/GetCategoryItems";
import { config } from "../../src/config";

async function handler(req, res) {
    const category = viewOnPath(["query", "category"], req);

    const response = (status, message) => res.status(status).json(message);

    const getData = async (catgr) => {
        try{
            let items = await getItems(catgr);
            response(200, items);
        } catch(e) {
            console.log(e);
            response(500, "Internal server error");
        }
    }

    return includes(category, config("categories")) ? 
        await getData(category) :
        response(404, "Not found");
}

export default handler;