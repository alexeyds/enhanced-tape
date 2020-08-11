import test from "tape";
import maybeEndTest from "maybe_end_test";

test("maybeEndTest()", function(t) {
  let tStub = { end: () => {} };

  t.test("does nothing if test is already ended", function(t) {
    t.end();

    maybeEndTest(t);
  });

  t.test("ends tests", function(t) {
    maybeEndTest(t);
  });

  t.test("returns result", function(t) {
    let result = maybeEndTest(tStub, "foo");
    t.equal(result, "foo");
  
    t.end();
  });

  t.test("returns promise result", async function(t) {
    let result = await maybeEndTest(tStub, Promise.resolve("foo"));
    t.equal(result, "foo");

    t.end();
  });
});
