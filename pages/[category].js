import { concat } from "ramda";
import { composeP, viewOnPath } from "ramda-godlike";
import { switchEq } from "../src/api/Styling";
import TableElement from "../src/client/Table";
import { useClientHeight } from "../src/ClientHeight";
import { config } from "../src/config";

const Page = ({items}) => TableElement(items, useClientHeight(146));

export const getServerSideProps = async (context) => {
    //#region Data fetching methods
    const redirect = (page) => {return {redirect: {destination: page, permanent: false}}};

    const okStatusParser = async (res) => {
        let items = await res.json();
        return {props: {items}};
    };

    const responseHandler = (res) => switchEq(
        res.status, 
        [200, 404, 500],
        [okStatusParser(res), redirect("404"), redirect("505")]
    )

    let url = process.env.NODE_ENV !== 'production' ?
        'http://localhost:3000/api/items?category=':
        config("server", "url") + "api/items?category=";

    const getData = composeP(
        responseHandler,
        fetch,
        concat(url)
    )
    //#endregion

    const category = viewOnPath(["params", "category"], context);    
    return await getData(category);

    // const getData = async (category) => {
    //     try{
    //         console.log(1)
    //         let items = await getItems(category);
    //         return {props: {items}};
    //     } catch(e) {
    //         console.log(e);
    //         redirect("/500");
    //     }
    // }

    // return includes(category, config("categories")) ? 
    //     await getData(category) :
    //     redirect("/404");
}

export default Page;