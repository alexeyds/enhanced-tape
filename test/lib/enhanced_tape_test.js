import test from "enhanced_tape";

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
  });
});

function assertTestFails(t, doTest, errorMatch) {
  let oldFail = t.fail;

  t.fail = (message) => {
    t.true(message.match(errorMatch), `fails test with ${errorMatch} message`);
    t.fail = oldFail;
  };

  doTest();
}