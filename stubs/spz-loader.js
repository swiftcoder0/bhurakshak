// Stub for @spz-loader/core to eliminate unescaped octal syntax error in production bundle
export const loadSpz = async () => {
  throw new Error("SPZ Gaussian Splats are not supported in this bundle.");
};

const defaultExport = { loadSpz };
export default defaultExport;
