import { OparationButtonInterface } from "../App";
import { ACTIONS } from "../App";

export function OperationButton({ operation, dispatch }: OparationButtonInterface) {
  const handleClick = () => {
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
  };

  const styleOperations = ["=", "+", "-", "*", "/"];
  const orangeButtons = styleOperations.includes(operation)? "styled-operation" : "";
  const styleDel = ["AC", "DEL", "%"];
  const greyButtons = styleDel.includes(operation)? "styled-del" : "";

  return (
    <button onClick={handleClick} className={orangeButtons || greyButtons}>
      {operation}
    </button>
  );
}