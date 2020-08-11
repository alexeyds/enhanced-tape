export default function assertTestFails(t, doTest, errorMatch) {
  let oldFail = t.fail;
  let oldEnd = t.end;

  let hadFailed = false;
  t.fail = (message) => {
    hadFailed = true;
    t.match(message, errorMatch, `fails test with ${errorMatch} message`);
  };

  t.end = () => {
    t.fail = oldFail;

    if (!hadFailed) {
      t.fail(`Expected test to fail with ${errorMatch} but it did not.`);
    }

    t.end = oldEnd;
    t.end();
  };

  doTest();
}