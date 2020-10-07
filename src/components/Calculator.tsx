import * as React from 'react';
import CalcButton from './CalcButton';
import Display from './Display';
import '../styles/components/Calculator.css';

const upperMax = 10000000000;
const lowerMax = -1000000000;

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
      lastPress != 'clr'
    ) {
      const newNum = parseInt(`${mainDisplay}${num}`);
      if (newNum < upperMax && newNum > lowerMax) setMainDisplay(newNum);
    } else {
      setMainDisplay(num);
      if (lastPress === '=') {
        setHistory('');
        setLeftSide(0);
        setOperator('');
      }
    }
    setLastPress(num.toString());
  };

  const oppClick = (opp: string) => {
    switch (opp) {
      case '+':
        if (mainDisplay !== 0) {
          if (lastPress === '=') {
            setHistory(`${mainDisplay} +`);
            setLeftSide(mainDisplay);
          } else if (!isNaN(parseInt(lastPress)) && operator === '-') {
            setHistory(`${history} ${mainDisplay} +`);
            setLeftSide(leftSide - mainDisplay);
            setMainDisplay(leftSide - mainDisplay);
          } else if (leftSide !== 0) {
            const added = mainDisplay + leftSide;
            setLeftSide(added);
            setMainDisplay(added);
            setHistory(`${history} ${mainDisplay} +`);
          } else {
            setLeftSide(mainDisplay);
            setHistory(`${mainDisplay} ${opp}`);
          }
          setOperator('+');
        }
        setLastPress(opp);
        break;
      case '-':
        if (mainDisplay !== 0) {
          if (lastPress === '=') {
            setHistory(`${mainDisplay} -`);
            setLeftSide(mainDisplay);
          } else if (!isNaN(parseInt(lastPress)) && operator === '+') {
            setHistory(`${history} ${mainDisplay} -`);
            setLeftSide(leftSide + mainDisplay);
            setMainDisplay(leftSide + mainDisplay);
          } else if (leftSide !== 0) {
            const subtracted = leftSide - mainDisplay;
            setLeftSide(subtracted);
            setMainDisplay(subtracted);
            setHistory(`${history} ${mainDisplay} -`);
          } else {
            setLeftSide(mainDisplay);
            setHistory(`${mainDisplay} ${opp}`);
          }
          setOperator('-');
        }
        setLastPress(opp);
        break;
      case '=':
        if (operator === '+') {
          setHistory(`${history} ${mainDisplay} =`);
          setMainDisplay(leftSide + mainDisplay);
          setLeftSide(mainDisplay);
        } else if (operator === '-') {
          setHistory(`${history} ${mainDisplay} =`);
          setMainDisplay(leftSide - mainDisplay);
          setLeftSide(mainDisplay);
        }
        setOperator('=');
        setLastPress(opp);
        break;
      case 'clr':
        setMainDisplay(0);
        setHistory('0');
        setLeftSide(0);
        setOperator('');
        setLastPress(opp);
        break;
    }
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
          <CalcButton Text="clr" OnClick={(opp) => oppClick(opp)} OppBtn />
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
          <CalcButton Text="+" OnClick={(opp) => oppClick(opp)} OppBtn />
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
          <CalcButton Text="-" OnClick={(opp) => oppClick(opp)} OppBtn />
          <div className="flex-container">
            <CalcButton
              Text="0"
              OnClick={(num) => numClick(+num)}
              OppBtn={false}
            />
            <CalcButton Text="=" OnClick={(opp) => oppClick(opp)} OppBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
