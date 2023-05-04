# BumFs

To run:

```bash
bun run index.ts
```

## THE FILE SYSTEM

## TODO LIST:

// Use C LANG

[✓] Create our own log.\
[✓] Create a function that checks if a file exists or not.\
[✓] Create a function that creates a file and can store content.\
[✓] Create a function that deletes a file.

## You will use "bun:ffi" to achieve this.

[✓] import the "log" function from C language and use it with (bun:ffi).\
[✓] import the "exists" function from C language and use it with(bun:ffi).\
[✓] import the "writeFile" function form C language and use it with(bun:ffi),\
[✓] import the "openFile" function from C language and use it with(bub:ffi),\
[✓] import the "removeFIle" function from C language and use it with (bun:ffi).

## Testing all functions with "bun:test";

[✓] Testing the "exits" function > It should return false if the file don't exists.\
[✓] Testing the "writeFile" function > It should be able to write a file.\
[✓] Testing the "writeFile" function > It should be able to create file and add content to it.\
[✓] Testing the "exits" function > It should return true if the file exists.\
[✓] Testing the "openFile" function > It should return a string if the file could be opened.\
[✓] Testing the "removeFile" function > It should be able to delete a file

This project was created using `bun init` in bun v0.5.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
