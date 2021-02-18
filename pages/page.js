import TableElement from "../src/client/Table";
import { useClientHeight } from "../src/ClientHeight";
import { data } from "../src/fakeData";

export default () => TableElement(null, useClientHeight(146));
