import { dlopen, suffix, FFIType } from "bun:ffi";

const filename: string = `fs.${suffix}`;
const location: URL = new URL(filename, import.meta.url);

const { symbols } = dlopen(location.pathname, {
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

  openFile: {
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
