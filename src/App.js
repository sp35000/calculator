import React, { useState } from "react";
import * as mathjs from "mathjs";
import Wrapper from "./components/Wrapper";
import Display from "./components/Display";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "=","/"],
  ["C"]
];

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num:
      calc.num.toString().includes(".")
      ? calc.num + value
      : calc.num === 0 && value === "0"
      ? "0"
      : calc.num % 1 === 0
      ? Number(calc.num + value)
      : calc.num + value,
      res: !calc.sign ? 0 : calc.res,
    });
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a,b,sign) =>
        sign === "+"
          ? mathjs.format(mathjs.add(a,b),{precision: 14})
          : sign === "-"
          ? mathjs.format(mathjs.subtract(a,b),{precision: 14})
          : sign === "X"
          ? mathjs.format(mathjs.multiply(a,b),{precision: 14})
          : mathjs.format(mathjs.divide(a,b),{precision: 14});

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Error: division by 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <h1 align="center">Calculator</h1>
      <Display value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
