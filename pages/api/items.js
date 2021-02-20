import { includes } from "ramda";
import { viewOnPath } from "ramda-godlike";
import { getItems } from "../../src/api/GetCategoryItems";
import { config } from "../../src/config";

async function handler(req, res) {
    const response = (status, data) => {
        let inProcess = !res.finished;
        inProcess && res.write(JSON.stringify({status: status, data: data}));
        inProcess && res.end();
    }

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

        const sendDummy = () => {
            !res.finished && res.write(' ');

            // As sendDummy use recursion, the check of depth is required
            isToManyDummies() ? 
                response(500, "too many dummies ( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)") && res.end() : //too much recursion
                setTimeout(waitOrSend, 3000); // if everything ok, repeat after 3 sec
        }

        const sendRes = () => {
            response(200, data);
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

    const errorHandler = (reason, promise) => {
        console.warn(
            "\x1b[1m\x1b[4m\x1b[31mUnhandled Rejection\x1b[0m\n\t\x1b[1m\x1b[33mPromise:\x1b[0m %s \n\t\x1b[1m\x1b[33mReason:\x1b[0m %s\n", 
            promise, reason
        );
        response(500, "Internal server error (╥﹏╥)");
    }

    // Error handler for entire api
    process.on("unhandledRejection", errorHandler); 

    includes(category, config("categories")) ? 
            await getData(category) :
            response(404, "Not found (>人<)");
}

export default handler; 