# Bunland/fs

## install 

```typescript
bun add @bunland/fs
```

## Usage:

```typescript
import { FS } from "@bunland/fs";

const fs = new FS();

fs.log("hello World");
await fs.writeFile("./example.txt", "hello world");
fs.log(await fs.exists("./example.txt"));
fs.log(await fs.openFile("./example.txt"));
fs.log(await fs.removeFile("./example.txt"));
```



