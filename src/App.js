import { extendObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { fromPromise } from 'mobx-utils';
import React from 'react';
import { render } from 'react-dom';

function simulateLoad(num1, num2, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          add: num1 + num2,
          sub: num1 - num2,
          mul: num1 * num2,
          div: num1 / num2
        }
      });
    }, delay);
  });
}

const store = observable({
  lhs: 10,
  rhs: 5,
  testNum: 0,
  test: () => {return this.testNum;},
  get asyncResult() {
    return fromPromise(
      simulateLoad(this.lhs, this.rhs, 500).then(
        (result) => result.data
      )
    );
  }
});

const Result = ({lhs, rhs, sign, result}) => (
  <div>
    <b>{lhs}</b>
    {` ${sign} `}
    <b>{rhs}</b>
    {' = '}
    <i>{result}</i>
  </div>
);

const Calculator = observer(({ store }) => {
  const { lhs, rhs, asyncResult } = store;
  return asyncResult.case({
    pending: () => <div>Loading...</div>,
    fulfilled: (data) => (
      <div>
        <Result lhs={lhs} rhs={rhs} sign='+' result={data.add} />
        <Result lhs={lhs} rhs={rhs} sign='-' result={data.sub} />
        <Result lhs={lhs} rhs={rhs} sign='x' result={data.mul} />
        <Result lhs={lhs} rhs={rhs} sign='/' result={data.div} />
      </div>
    ),
    rejected: () => <div>Error!</div>
  });
});

const TodoView = observer(({store}) =>
    <div>{'test'+store.testNum}</div>
)

window.getTest = () => {console.log(store.testNum)};

setInterval(() => store.lhs += 1, 3000);
setInterval(() => store.rhs += 0.5, 5000);
setInterval(() => store.testNum++, 500);
