import test from "tape";
import { tryTest } from "error_handling";
import maybeEndTest from "maybe_end_test";

let enhancedTape = new Proxy(test, { apply: applyNewTest });

let GLOBAL_BEFORE_EACH = [];
enhancedTape.beforeEach = (callback) => {
  GLOBAL_BEFORE_EACH.push(callback);
};

let GLOBAL_AFTER_EACH = [];
enhancedTape.afterEach = (callback) => {
  GLOBAL_AFTER_EACH.push(callback);
};

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

  let oldEnd = t.end;
  t.end = () => {
    GLOBAL_AFTER_EACH.forEach(c => c(t));
    oldEnd();
  };

  GLOBAL_BEFORE_EACH.forEach(c => c(t));
  let result = tryTest(t, () => doTest.apply(thisArg, [t, ...rest]));
  return maybeEndTest(t, result);
}

export default enhancedTape;
