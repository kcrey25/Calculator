import * as React from 'react';
import '../styles/components/calcButton.css';

interface ButtonProps {
  Text: string;
  OnClick: (event: string) => void;
  OppBtn: boolean;
}

const CalcButton: React.FC<ButtonProps> = ({ Text, OnClick, OppBtn }) => {
  return (
    <button
      className={OppBtn ? 'btn opp-btn' : 'btn basic-btn'}
      onClick={() => OnClick(Text)}
    >
      {Text}
    </button>
  );
};

export default CalcButton;
