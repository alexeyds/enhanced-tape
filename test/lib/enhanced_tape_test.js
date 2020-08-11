import test from "enhanced_tape";
import assertTestFails from "test/support/assert_test_fails";

test("tape", function(t) {  
  t.test("error handling", function(t) {
    t.test("catches errors", function(t) {
      assertTestFails(t, () => { throw new Error("foo"); }, /foo/);

      t.end();
    });

    t.test("catches rejections", async function(t) {
      assertTestFails(t, () => { throw new Error("foo"); }, /foo/);
    
      t.end();
    });

    t.test("extends test name", async function(t) {
      t.match(t.name, /tape error handling/);
    
      t.end();
    });
  });
});
