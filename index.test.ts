import { describe, expect, test } from "bun:test";
import { FS } from "./src/lib/fs";

const fs = new FS();

describe(`Testing the "exits" function`, () => {
  test("It should return false if the file don't exists.", async () => {
    expect(await fs.exists("./example1.json")).toBe(false);
  });
});

describe(`Testing the "writeFile" function`, () => {
  test("It should be able to write a file", async () => {
    expect(await fs.writeFile("./example.txt")).toBe(
      "File created successfully"
    );
  });
});

describe(`Testing the "writeFile" function`, () => {
  test("It should be able to create file and add content to it", async () => {
    expect(
      await fs.writeFile("./example.txt", "Hello world from my test")
    ).toBe("File created successfully");
  });
});

describe(`Testing the "exits" function`, () => {
  test("It should return true if the file exists.", async () => {
    expect(await fs.exists("./example.txt")).toBe(true);
  });
});

describe(`Testing the "openFile" function`, () => {
  test("It should return a string if the file could be opened", async () => {
    expect(await fs.readFile("./example.txt")).toBe("Hello world from my test");
  });
});

describe(`Testing the "removeFile" function`, () => {
  test("It should be able to delete a file", async () => {
    expect(await fs.removeFile("./example.txt")).toBe(
      `The file ./example.txt was deleted successfully`
    );
  });
});
