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

    t.test("extends test name", function(t) {
      t.match(t.name, /tape error handling/);
    
      t.end();
    });

    t.test("automatically ends tests", function(t) {
      t.pass();
    });

    t.test("automatically ends async tests", async function(t) {
      await new Promise(resolve => resolve());
      t.pass();
    });
  });
});
