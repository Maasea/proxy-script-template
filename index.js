import Client from "./lib/client.js";
import { parseBody, stringifyBody } from "./src/example.js";

const $ = Client.getInstance("Script Name", { debug: true });

const body = parseBody($.response.body);

body.foo = "123456";

$.timeStart("Loop");
for (let i = 0; i < 10000; i++) {

}
$.timeEnd("Loop");

$.msg("a", "b", "c", "https://www.baidu.com");

$.done({ body: stringifyBody(body) });
