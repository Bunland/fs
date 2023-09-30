import { BunFS } from "./src/lib/fs";

const fs = new BunFS();
fs.log("hello World");
await fs.writeFile("./example.txt", "hello world");
fs.log(await fs.exists("./example.txt"));
fs.log(await fs.openFile("./example.txt"));
fs.log(await fs.removeFile("./example.txt"));
