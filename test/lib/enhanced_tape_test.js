import test from "enhanced_tape";
import assertTestFails from "test/support/assert_test_fails";

let beforeEachCalledTimes = 0;
test.beforeEach(() => {
  beforeEachCalledTimes += 1;
});

let afterEachCalledTimes = 0;
test.afterEach(() => {
  afterEachCalledTimes += 1;
});


test("tape", function(t) {
  t.test("beforeEach()", function(t) {
    t.equal(beforeEachCalledTimes, 2);

    t.test("runs function before each test", function(t) {
      t.equal(beforeEachCalledTimes, 3);
  
      t.end();
    });
  });

  t.test("afterEach()", function(t) {
    t.equal(afterEachCalledTimes, 3);

    t.test("runs function before each test", function(t) {
      t.equal(afterEachCalledTimes, 4);
  
      t.end();
    });
  });

  t.test("error handling", function(t) {
    t.test("catches errors", function(t) {
      assertTestFails(t, () => { throw new Error("foo"); }, /foo/);

      t.end();
    });

    t.test("catches rejections", async function(t) {
      assertTestFails(t, () => { throw new Error("foo"); }, /foo/);
    
      t.end();
    });
  });

  t.test("naming", function(t) {
    t.test("extends test name", function(t) {
      t.match(t.name, /tape naming/);
    
      t.end();
    });
  });


  t.test("test ending", function(t) {
    t.test("automatically ends tests", function(t) {
      t.pass();
    });

    t.test("automatically ends async tests", async function(t) {
      await new Promise(resolve => resolve());
      t.pass();
    });
  });
});
