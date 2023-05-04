// Encoder
import { CString } from "bun:ffi";
import { symbols } from "./ffi";

const utf8e: TextEncoder = new TextEncoder();
const encode: (ptr: any) => Uint8Array = (ptr: any) => utf8e.encode(ptr + "\0");

const toString = function (ptr: any): string {
  const str = new CString(ptr);
  symbols.freeString(str.ptr);
  return str.toString();
};

export { encode, toString };
