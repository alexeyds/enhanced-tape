import test from "tape";

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

function tryTest(t, doTest) {
  try {
    let result = doTest();
    if (result && result.catch) {
      return result.catch(e => failWithError(t, e, "Unhandled rejection"));
    } else {
      return result;
    }
  } catch(e) {
    failWithError(t, e, "Unhandled exception");
  }
}

function failWithError(t, e, info) {
  t.fail(`${info}: ${e.message}`, {error: e});
  t.end();
}

export default new Proxy(test, { apply: applyNewTest });