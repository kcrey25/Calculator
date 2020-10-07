import * as React from 'react';
import '../styles/components/Display.css';

interface DisplayProps {
  Main: number;
  History: string;
}

const Display: React.FC<DisplayProps> = ({ Main, History }) => {
  return (
    <div className="display">
      <div className="history">{History === '0' ? null : History}</div>
      <div className="main-display">{Main}</div>
    </div>
  );
};

export default Display;
