import { ptr } from "bun:ffi";
import { symbols } from "./ffi";
import { encode, toString } from "./encoder";

class FS {
  constructor() {}

  log(message: any) {
    symbols.lg(ptr(encode(message)));
  }

  async exists(pathname: string): Promise<boolean> {
    return Promise.resolve(symbols.exists(ptr(encode(pathname))));
  }

  async writeFile(pathname: string, content?: string): Promise<string> {
    let result;

    if (content) {
      result = Promise.resolve(
        symbols.writeFile(ptr(encode(pathname)), ptr(encode(content)))
      );
    } else {
      //@ts-ignore
      result = Promise.resolve(symbols.writeFile(ptr(encode(pathname))));
    }
    if (!result) throw new Error(`Error writing the file ${pathname}.`);
    return "File created successfully";
  }

  async removeFile(pathname: string): Promise<string> {
    let result = Promise.resolve(symbols.removeFile(ptr(encode(pathname))));
    if (await result) return `The file ${pathname} was deleted successfully`;
    throw new Error(`The file ${pathname} could not be deleted`);
  }

  async openFile(pathname: string): Promise<string> {
    return Promise.resolve(toString(symbols.openFile(ptr(encode(pathname)))));
  }
}

export { FS };
