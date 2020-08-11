import test from "tape";
import assertTestFails from "test/support/assert_test_fails";
import { tryTest } from "error_handling";

test("tryTest()", function(t) {
  t.test("runs given function", function(t) {
    let result = tryTest(t, () => "hi");

    t.equal(result, "hi");
  
    t.end();
  });

  t.test("catches normal errors", function(t) {
    assertTestFails(t, () => {
      tryTest(t, () => { throw new Error; });
    }, /Unhandled exception/);
  });

  t.test("works if test function returns nothing", async function(t) {
    tryTest(t, () => { });
  
    t.end();
  });

  t.test("catches promise rejections", function(t) {
    let returnFakePromiseRejection = () => {
      return { catch: (f) => f(new Error("Fake promise rejection")) };
    };

    assertTestFails(t, () => {
      tryTest(t, returnFakePromiseRejection);
    }, /Unhandled rejection/);
  });
});
