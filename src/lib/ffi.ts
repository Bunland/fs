import { fileURLToPath } from "bun";
import { dlopen, suffix, FFIType } from "bun:ffi";

const filename: string = `fs.${suffix}`

const pathname: string = fileURLToPath(new URL(filename, import.meta.url))

const { symbols } = dlopen(pathname, {
  lg: {
    args: [FFIType.ptr],
  },

  exists: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },

  writeFile: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.bool,
  },

  readFile: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },

  removeFile: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },

  freeString: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
});

export { symbols };
