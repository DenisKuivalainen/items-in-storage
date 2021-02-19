import { concat } from "ramda";
import { composeP, viewOnPath } from "ramda-godlike";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { switchEq } from "../../src/api/Styling";
import TableElement from "../../src/client/Table";
import { useClientHeight } from "../../src/ClientHeight";

const getData = async (category, router) => {
    //#region Data fetching methods
    const redirect = (url) => window.open(window.location.origin + "/" + url, "_self");

    const responseHandler = (res) => res.status === 200 ? res.json() : null;

    const getData = composeP(
        responseHandler,
        fetch,
        concat("api/items?category=")
    )
    //#endregion
  
    return await getData(category);
}

const Page = () => {
    const[items, setItems] = useState(null);
    const[currentCategory, setCurrentCategory] = useState(null);
    const router = useRouter();
    const clientHeigth = useClientHeight(146);

    const fetchItems = async (category) => {
        setCurrentCategory(category);
        setItems(null);
        let data = await getData(category, router);
        await setItems(data);
    }

    useEffect(async () => {
        let category = await viewOnPath(["query", "category"], router);
        console.log(category);
        // Checks if router has prop category AND if the category in router differs from category on which page was rendered
        !!category && category !== currentCategory && await fetchItems(category);
    });

    return TableElement(items, clientHeigth);
}

export default Page;