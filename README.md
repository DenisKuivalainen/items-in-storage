# Storage items - interview task

This project is an Assignment for Junior Developer in Reaktor.
>Your client is a clothing brand that is looking for a simple web app to use in their warehouses. To do their work efficiently, the warehouse workers need a fast and simple listing page per product category, where they can check simple product and availability information from a single UI.

## Links

* [WEB App](https://reactorjuniortask.herokuapp.com/) hosted on Heroku;

## Technologies

* Next js
* React
* Node js
* Ramda

## Application logic
The point was to display data of items in storage, which were achieved from some legacy API. 
As the data, which was possible to obtain from API, is some kind of collapsed, there were need to combine it into a single json format.

#### Back end
##### Overview
The documentation from the task: 
>GET /products/:category – Return a listing of products in a given category.
GET /availability/:manufacturer – Return a list of availability info.

Data recieved from the API requests (products and availability respectively):
![Legacy API data](https://i.ibb.co/2ZVLpRT/image.png)

As there were need to display all available data, the final format should look like:
![Reorganizing data](https://i.ibb.co/RQPRbB5/image.png)
##### Realization
As result, the backend operates by follow scenario:

**_STEP 0._** If there is no such category in config file, the server will immideately send "Not found" response to client.

**_STEP 1._** Get products data about required category.

**_STEP 2._** Select unique manufacturers from recieved data.
```javascript
const getUniqManufacturers = compose(
    dropRepeats,
    sortBy(identity),
    map(viewOnPath(["manufacturer"]))
)
```
**_STEP 3._** From array just got, get an object of type {"manufacturer1": [item1, item2, ...], ...}.
```javascript
const getItemsObject = async (names) => zipObj(names, await getAllItems(names));
```
**_STEP 4._** Get new array, which will be sent to client.
So, for every item in products data:

_STEP 4.1._ Find data about the manufacturer, comparing id, and get availability.
```javascript
const getAvailability = curry((catItem, manObject) => {
    let mArr = compose(
        viewOnPath(__, manObject),
        append(__, []),
        viewOnPath(["manufacturer"])
    )(catItem);

    let availability =  compose(
        parseAvailability,
        viewOnPath(["DATAPAYLOAD"]),
        find(__, mArr),
        propEq("id"),
        toUpper,
        viewOnPath(["id"])
    )(catItem);

    return availability;
}); 
```
_STEP 4.2._ Update and edit every item data about category items.
```javascript
const editItem = curry((catItem, manObject) => {
    const editValue = curry((fn, key, obj) => { //apply a function to value with key
        let path = append(key, []);
        return compose(
            setOnPath(path, __, obj),
            fn,
            viewOnPath(path)
        )(obj)
    });

    //how to edit values
    var capitalizeValue = editValue(capitalizeMultiple);
    var joinValue = editValue(join(", "));
    
    return compose(
        joinValue("color"),
        capitalizeValue("name"),
        capitalizeValue("manufacturer"),
        item => assoc("availability", getAvailability(item, manObject), item) //allways before capitalizeValue("manufacturer"), or use toLower
    )(catItem);
});
```

**_STEP 5._** Send to client.
In case of an error, the server will send error message to client to be redirected.
Else, server immideately will send status 200 to client. As the Bad API responce can take quite much time (more then default timeout - 30 sec), each 3 seconds the responce data is checked, if it is ready. If not, a whitespace will be sent to client.
>According to the JSON RFC 4627: 
Insignificant whitespace is allowed before or after any of the six structural characters.

### Front end
The two main points of WEB app: clear display of data and handling server responses. 

##### UI
The UI is not complex, done with Material UI.
The app has 4 pages: 3 products categories and one with few information about the app (it appears if the route path mismatch). 
![Info page](https://i.ibb.co/722z1MV/1.png)
![Product category page](https://i.ibb.co/Xs7QW3n/1.png)

##### Handling server responces
If the content not found or an error occured on server,the user will be redirected to 404 or 500 page respectively.
![404](https://i.ibb.co/2ShCPnm/1.png)
![500](https://i.ibb.co/NtjhgGP/1.png)

#### Error handling
The best way was to create a middleware. But simce Next js was used and there is only one API route, it was decided to merge them with API path code. So, it is about the error handling as well as response timeout prolongation (sending witespaces).

The error handler is one for entire API code. It helps to keep on DRY and SOLID.
```javascript
process.on("unhandledRejection", errorHandler); 
```

#### Recursion
Working with Bad API there were a problem, that correct data dont reach the server. So there is need to fetch again... and again... and again... For this purpose recursion was used with back door (throw error) is it will be too deep.

So, two things were added: recursion and deepth check. Error caused by deepth check will leed to be collected by error handler, and after client will bw redirected to 500 page.
```javascript
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
            await fetchData // To the rabbit hole
    }
    
    return await fetchData();
}
```

## License
Application was tested with Jest (unit testing) and Cypress (e2e). All functions and functionality were covered.
![jest](https://i.ibb.co/dkvJmTz/jest.png) ![Cypress](https://i.ibb.co/TWVdNVt/cy.png)

## License

MIT

