import test from "tape";
import { tryTest } from "error_handling";
import maybeEndTest from "maybe_end_test";

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

  let result = tryTest(t, () => doTest.apply(thisArg, [t, ...rest]));
  return maybeEndTest(t, result);
}

export default new Proxy(test, { apply: applyNewTest });
