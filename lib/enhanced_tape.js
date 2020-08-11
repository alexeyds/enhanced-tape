import test from "tape";
import { tryTest } from "error_handling";

function applyNewTest(createTest, thisArg, [name, opts, doTest, ...rest]) {
  doTest = doTest === undefined ? opts : doTest;

  name = scopedName(thisArg, name);
  doTest = new Proxy(doTest, { apply: applyDoTest });

  return createTest.apply(thisArg, [name, opts, doTest, ...rest]);
}

function scopedName(thisArg, name) {
  let scopeName = thisArg && thisArg.name;
  if (scopeName) {
    return `${scopeName} ${name}`;
  } else {
    return name;
  }
}

function applyDoTest(doTest, thisArg, [t, ...rest]) {
  t.test = new Proxy(t.test, { apply: applyNewTest });

  return tryTest(t, () => doTest.apply(thisArg, [t, ...rest]));
}

export default new Proxy(test, { apply: applyNewTest });
