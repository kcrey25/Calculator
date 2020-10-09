import * as React from 'react';
import CalcButton from './CalcButton';
import Display from './Display';
import '../styles/components/Calculator.css';

const upperMax = 10000000000;
const lowerMax = -1000000000;
const operations = ['x', '/', '+', '-'];

const Calculator = () => {
  const [mainDisplay, setMainDisplay] = React.useState<number>(0);
  const [history, setHistory] = React.useState<string>('0');
  const [leftSide, setLeftSide] = React.useState<number>(0);
  const [operator, setOperator] = React.useState<string>('');
  const [lastPress, setLastPress] = React.useState<string>('');

  const numClick = (num: number) => {
    if (
      mainDisplay !== 0 &&
      lastPress !== '+' &&
      lastPress !== '-' &&
      lastPress !== 'x' &&
      lastPress !== '/' &&
      lastPress !== '='
    ) {
      const newNum = parseInt(`${mainDisplay}${num}`);
      if (newNum < upperMax && newNum > lowerMax) setMainDisplay(newNum);
    } else {
      setMainDisplay(num);
      if (lastPress === '=') {
        setHistory('');
        setLeftSide(0);
        setOperator('');
        setLastPress('');
      }
    }
    setLastPress(num.toString());
  };

  const onClear = () => {
    setMainDisplay(0);
    setHistory('0');
    setLeftSide(0);
    setOperator('');
    setLastPress('');
  };

  const onEqual = () => {
    switch (operator) {
      case '+':
        setHistory(`${history} ${mainDisplay} =`);
        setMainDisplay(leftSide + mainDisplay);
        setLeftSide(mainDisplay);
        break;
      case '-':
        setHistory(`${history} ${mainDisplay} =`);
        setMainDisplay(leftSide - mainDisplay);
        setLeftSide(mainDisplay);
        break;
      case 'x':
        setHistory(`${history} ${mainDisplay} =`);
        setMainDisplay(leftSide * mainDisplay);
        setLeftSide(mainDisplay);
        break;
      case '/':
        setHistory(`${history} ${mainDisplay} =`);
        setMainDisplay(leftSide / mainDisplay);
        setLeftSide(mainDisplay);
        break;
    }
    setOperator('=');
    setLastPress('=');
  };

  const onCommonOp = (op: string) => {
    if (mainDisplay !== 0) {
      if (lastPress === '=') {
        setHistory(`${mainDisplay} ${op}`);
        setLeftSide(mainDisplay);
      } else if (
        !isNaN(parseInt(lastPress)) &&
        operator !== '' &&
        !operations.splice(operations.indexOf(op), 1).includes(op)
      ) {
        lastPressNum(op);
      } else if (leftSide !== 0) {
        normalOp(op);
      } else {
        setLeftSide(mainDisplay);
        setHistory(`${mainDisplay} ${op}`);
      }
      setOperator(op);
    }
    setLastPress(op);
  };

  const normalOp = (op: string) => {
    let opResult = 0;
    if (operator === '+') {
      opResult = leftSide + mainDisplay;
    } else if (operator === 'x') {
      opResult = leftSide * mainDisplay;
    } else if (operator === '/') {
      opResult = leftSide / mainDisplay;
    } else if (operator === '-') {
      opResult = leftSide - mainDisplay;
    }
    setLeftSide(opResult);
    setMainDisplay(opResult);
    setHistory(`${history} ${mainDisplay} ${op}`);
  };

  const lastPressNum = (op: string) => {
    let result = 0;
    if (operator === '+') {
      result = leftSide + mainDisplay;
    } else if (operator === 'x') {
      result = leftSide + mainDisplay;
    } else if (operator === '/') {
      result = leftSide / mainDisplay;
    } else if (operator === '-') {
      result = leftSide - mainDisplay;
    }
    setHistory(`${history} ${mainDisplay} ${op}`);
    setLeftSide(result);
    setMainDisplay(result);
  };

  return (
    <div className="behind">
      <div className="calc">
        <Display Main={mainDisplay} History={history} />
        <div className="buttons">
          <CalcButton
            Text="7"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton
            Text="8"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton
            Text="9"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton Text="clr" OnClick={() => onClear()} OppBtn />
          <CalcButton
            Text="4"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton
            Text="5"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton
            Text="6"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton Text="+" OnClick={() => onCommonOp('+')} OppBtn />
          <CalcButton
            Text="1"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton
            Text="2"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton
            Text="3"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton Text="-" OnClick={() => onCommonOp('-')} OppBtn />
          <CalcButton
            Text="0"
            OnClick={(num) => numClick(+num)}
            OppBtn={false}
          />
          <CalcButton Text="x" OnClick={() => onCommonOp('x')} OppBtn />
          <CalcButton Text="/" OnClick={() => onCommonOp('/')} OppBtn />
          <CalcButton Text="=" OnClick={() => onEqual()} OppBtn />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
