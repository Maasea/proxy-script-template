# Proxy Script Template

一个简单的模板协助你快速完成 `Proxy Tool` 脚本的开发。

在这里我们提供了一个通用的 Client 类和一些常用的方法，用于兼容不同客户端的差异并减少重复工作。

即使不使用该类，模板也定义了常见的全局变量，实现部分方法的代码联想。

## 1 开始

1. 安装 `nodejs` 以进行后续项目的部署
2. 在项目下执行 `npm i` 以安装 `esbuild`
3. 使用 `npm run build` 将代码打包成完整的 `js` 文件

## 2 内置方法

### 2.1 lib/client.js

封装的通用客户端类[早期版本]，该类无需手动去判断客户端版本，使用通用的接口进行调用。

实现细节查看 [链接](https://github.com/Maasea/sgmodule/blob/322ed3ca8528cd2c71f435abf9bbd4c8f042e0ee/Script/Youtube/lib/client.ts)
1. 生成实例

```js
import Client from "./lib/client.js";

const $ = Client.getInstance("Script Name", { debug: true });
```

2. 使用方法

```js
$.request == $request;
$.response == $response;

$.request.url = "https://exmaple.com";
$.response.body = "abc";

$.fetch({ url: "https://exmaple.com", method: "GET" }).then(res => {});

$.setJSON("json", { "a": 1 });
$.getJSON("json");

$.timeStart("Show Timer");
/** do action*/
$.timeEnd("Show Timer"); // [log] Show Timer: x ms

$.done({ body: "" });

```

需要注意的是，客户端之间内置的接口存在差异，需要做一些转换

1. `bodyBytes` 成为通用接口

```js
// 类似 Qx $response.bodyBytes,Surge $response.body
$.response.bodyBytes; // 将返回 Uint8Array

// 类似 surge binary-mode=true
$.fetch({ bodyBytes: Uint8Array });
```

2. `id` 成为通用接口

```js
// 等价于 Qx $request.sessionIndex
$.request.id  
```

3. 完整接口

```js
static getInstance(name ? : string, options ? : { debug? : boolean; }):Client：/*静态方法，返回客户端的实例。*/

getVal(key:string) /*获取持久化存储的值 */
setVal(val:string, key:string):void：/*写入持久化存储的值 */

getJSON(key:string, alter ? : object):object/*以JSON 的形式读取持久化存储 */
setJSON(val:object, key:string):void：/*以JSON 的形式写入持久化存储 */

fetch(request:CFetchRequest):Promise < CFetchResponse >：/*发送请求 */

msg(title ? : string, subTitle ? : string, desc ? : string, url ? : string):void：/*显示通知 */
log(val:any):void：/*等价于 console.log */

timeStart(label:string):void：/*计时器开始 */
timeEnd(label:string):void：/*计时器结束 */

done(done:CDone):void：/*等价于 $done(obj) */
exit():void：/*等价于 $done({}) */
reject():void：/*等价于 $done() */
```

### 2.2 lib/urls.js

使用正则解析 URL @DualSubs

```js
import URLs from "./lib/urls.js";

const url = new URLs("https://www.baidu.com/path?a=1")

console.log(url)

url.params.a = 2
const newURL = url.toString()

console.log(newURL)
```

```
output:

URLs {
  name: 'URL v1.0.2',
  scheme: 'https',
  host: 'www.baidu.com',
  path: 'path',
  params: { a: '1' }
}

https://www.baidu.com/path?a=2
```

### 2.3 lib/textPolyfill.js

用于添加 `TextDecoder` 和 `TextEncoder` 作为全局变量,需要时取消 `build.js` 中的注释

### 2.4 script/decodeProtobuf.js

使用 protoc 反序列化 protobuf/grpc

1. 下载 protoc, 并为其配置全局变量
2. 修改以下代码

```js
const fileName = "path to your file";
// 是否为 grpc
const isGRPC = false;
```

3. 使用 `node` 运行
