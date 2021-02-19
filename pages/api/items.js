import { includes } from "ramda";
import { viewOnPath } from "ramda-godlike";
import { getItems } from "../../src/api/GetCategoryItems";
import { config } from "../../src/config";

async function handler(req, res) {
    const response = (status, data) => JSON.stringify({status: status, data: data});

    const getData = (catgr) => {
        let data;
        let loaded = false;
        let dummies = 0;

        const loadData = async () => {
            data = await getItems(catgr);
            loaded = true;
        }

        //#region SEND DATA
        const isToManyDummies = () => {
            dummies++;
            return dummies > 60;
        }

        const sendRes = () => {
            res.write(response(200, data));
            res.end();
        }

        const sendDummy = () => {
            res.write(' ');

            // As sendDummy use recursion, the check of depth is required
            isToManyDummies() ? 
                res.write(response(500, "too many dummies ( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)")) && res.end() : //too much recursion
                setTimeout(waitOrSend, 3000); // if everything ok, repeat after 3 sec
        }

        // If data for items loaded from getItems(), then send it, 
        // if not, send wite space as "part" of the data (it will be ignored)
        const waitOrSend = () => {
            loaded ? 
                sendRes() :
                sendDummy();
        }
        //#endregion

        loadData();
        waitOrSend();

    }
    
    const category = viewOnPath(["query", "category"], req);

    try {
        includes(category, config("categories")) ? 
            await getData(category) :
            res.write(response(404, "Not found (>人<)")) && res.end();
    } catch (e) {
        console.log(e);
        res.write(response(500, "Internal server error (╥﹏╥)"));
        res.end();
    }

    // process.on("unhandledRejection", (reason, p) => console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason));
}

export default handler; 