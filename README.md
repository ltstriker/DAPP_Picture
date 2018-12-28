# DAPP_Picture


先开启节点，并在server/api.js修改默认账户字段defaultAccount为所设置的字段。
服务器端：在server目录下使用yarn安装依赖，然后node index即可开启服务器

客户端在dapp-pic目录下使用yarn安装依赖，然后npm run dev即可开启客户端。

然后在浏览器打开localhost：8080即可打开应用。

## 为什么不build？
因为build完之后也打不开的，报错然后给一个博客（新闻？）链接。然后就gg了。

## 实现功能  
500bytes图片的区块链存储读取。

## 优点
只要记住相册的地址，就能够去找回来。

## 缺点
花费高，延迟高，容量小。