import { useReducer } from "react";
import "./App.css";
import { DigitButton } from "./components/DigitButton";
import { OperationButton } from "./components/OparationButton";

export enum ACTIONS {
  ADD_DIGIT = "add-digit",
  CHOOSE_OPERATION = "choose-operation",
  CLEAR = "clear",
  DELETE_DIGIT = "delete-digit",
  EVALUATE = "evaluate",
}

interface State {
  currentOperand: string;
  previousOperand: string;
  operation: string | null | undefined;
  result: string;
}

export interface Action {
  type: ACTIONS;
  payload?: {
    digit?: string;
    operation?: string;
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (action.payload?.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (action.payload?.digit === "." && state.currentOperand.includes(".")) {
        console.log("double comma separator...");
        return state;
      }
      if (action.payload?.digit === "." || state.currentOperand.includes(".")) {
        return {
          ...state,
          currentOperand: state.currentOperand + action.payload?.digit,
        };
      }
      return {
        ...state,
        currentOperand: String(
          Number(state.currentOperand + action.payload?.digit)
        ),
      };
    case ACTIONS.CHOOSE_OPERATION:
      return {
        ...state,
        operation: action.payload?.operation,
        previousOperand: state.currentOperand,
        currentOperand: "",
      };
    case ACTIONS.CLEAR:
      return {
        currentOperand: "0",
        previousOperand: "",
        operation: null,
        result: "0",
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: "0",
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (!state.operation) {
        return state;
      }

      let result: number;
      const prev = parseFloat(state.previousOperand);
      const current = parseFloat(state.currentOperand);

      switch (state.operation) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "*":
          result = prev * current;
          break;
        case "/":
          if (current === 0) {
            return state;
          }
          result = prev / current;
          break;
        default:
          return state;
      }

      return {
        ...state,
        currentOperand: String(result),
        previousOperand: "",
        operation: null,
        result: String(result),
      };

    default:
      return state;
  }
}

export interface DigitButtonInterface {
  digit: string;
  handleClick: (digit: string) => void;
}

export interface OparationButtonInterface {
  dispatch: (action: Action) => void;
  operation: string;
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    currentOperand: "0",
    previousOperand: "",
    operation: null,
    result: "0",
  });

  const handleDigitClick = (digit: string) => {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
    console.log(digit);
  };

  const handleClearClick = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };

  const handleDeleteClick = () => {
    dispatch({ type: ACTIONS.DELETE_DIGIT });
  };

  const handleEqualClick = () => {
    dispatch({ type: ACTIONS.EVALUATE });
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {state.previousOperand} {state.operation}
        </div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <div className="buttons-grid">
        <div className="buttons">
          <OperationButton
            operation="AC"
            dispatch={handleClearClick}
          ></OperationButton>
          <OperationButton
            operation="DEL"
            dispatch={handleDeleteClick}
          ></OperationButton>
          <OperationButton
            operation="%"
            dispatch={handleDeleteClick}
          ></OperationButton>
          <OperationButton operation="/" dispatch={dispatch}></OperationButton>
          <DigitButton digit="7" handleClick={handleDigitClick}></DigitButton>
          <DigitButton digit="8" handleClick={handleDigitClick}></DigitButton>
          <DigitButton digit="9" handleClick={handleDigitClick}></DigitButton>
          <OperationButton operation="*" dispatch={dispatch}></OperationButton>
          <DigitButton digit="4" handleClick={handleDigitClick}></DigitButton>
          <DigitButton digit="5" handleClick={handleDigitClick}></DigitButton>
          <DigitButton digit="6" handleClick={handleDigitClick}></DigitButton>
          <OperationButton operation="-" dispatch={dispatch}></OperationButton>
          <DigitButton digit="1" handleClick={handleDigitClick}></DigitButton>
          <DigitButton digit="2" handleClick={handleDigitClick}></DigitButton>
          <DigitButton digit="3" handleClick={handleDigitClick}></DigitButton>
          <OperationButton operation="+" dispatch={dispatch}></OperationButton>
          <DigitButton digit="0" handleClick={handleDigitClick}></DigitButton>
          <DigitButton digit="." handleClick={handleDigitClick}></DigitButton>
          <OperationButton
            operation="="
            dispatch={handleEqualClick}
          ></OperationButton>
        </div>
      </div>
    </div>
  );
}
export default App;
