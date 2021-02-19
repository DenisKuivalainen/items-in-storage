import { concat } from "ramda";
import { composeP, viewOnPath } from "ramda-godlike";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TableElement from "../../src/client/Table";
import { useClientHeight } from "../../src/ClientHeight";

const getData = async (category, router) => {
    //#region Data fetching methods
    // Redirect if not 200
    const redirect = (res) => {console.log(res.data);   router.push("/" + res.status);}

    //Check if 200
    const responseHandler = (res) => res.status === 200 ? res.data : redirect(res);

    let domain = process.env.NODE_ENV !== 'production' ?
        "http://localhost:3000/" :
        "https://reactorjuniortask.herokuapp.com/";

    const getData = composeP(
        responseHandler,
        r => r.json(),
        fetch,
        concat(domain + "api/items?category=")
    )
    //#endregion

    console.log(router)
    return await getData(category);
}

const Page = () => {
    const[items, setItems] = useState(null);
    const[currentCategory, setCurrentCategory] = useState(null);
    const router = useRouter();
    const clientHeigth = useClientHeight(146);

    const fetchItems = async (category) => {
        setCurrentCategory(category); //set new category
        setItems(null); //show loading bar if you are on same URL
        let data = await getData(category, router);
        await setItems(data);
    }

    useEffect(async () => {
        let category = await viewOnPath(["query", "category"], router);
        // Checks if router has prop category AND if the category in router differs from category on which page was rendered
        !!category && category !== currentCategory && await fetchItems(category);
    });

    return TableElement(items, clientHeigth);
}

export default Page;