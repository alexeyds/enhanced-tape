export function tryTest(t, doTest) {
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
  t.fail(`${info}: ${e.name}(${e.message})`, {error: e});
}
