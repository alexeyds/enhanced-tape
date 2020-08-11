export default function maybeEndTest(t, result) {
  if (result && result.then) {
    return result.then(maybeEndAsync(t));
  } else {
    maybeEnd(t);
    return result;
  }
}

function maybeEndAsync(t) {
  return (result) => {
    maybeEndTest(t);
    return result;
  };
}

function maybeEnd(t) {
  if (!t.calledEnd) {
    t.end();
  }
}