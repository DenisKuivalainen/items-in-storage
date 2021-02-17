import TableElement from "../src/client/Table";
import { useClientHeight } from "../src/ClientHeight";
import { data } from "../src/fakeData";

export default () => TableElement(data(2000), useClientHeight(146));
