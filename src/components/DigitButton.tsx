import { DigitButtonInterface } from "../App";

export function DigitButton({ digit, handleClick }: DigitButtonInterface) {
  const styleDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const digitsGrey = styleDigits.includes(digit)? "styled-digits" : "";
  const styleZero = ["0"];
  const zeroGrey = styleZero.includes(digit)? "styled-zero" : "";


  return (
    <button
      onClick={() => handleClick(digit)}
      className={digitsGrey || zeroGrey}
    >
      {digit}
    </button>
  );
}