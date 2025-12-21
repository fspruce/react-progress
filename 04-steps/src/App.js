import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}

function Steps() {
  /*
   * We can create a state variable using useState.
   *
   * useState is a hook, and so it can only be called at the
   * top level of a function (not inside a function, a loop, etc.).
   *
   * useState creates an object with two pieces on information in it,
   * the current state and a function to set the state. Due to this,
   * we can immediately destructure the object to allow us to access
   * the state information and set it using the function much
   * easier.
   *
   * The state should always be updated through the setState function so that the
   * component can automatically be reloaded with the new state included.
   *
   * The easiest way to figure out if you need to use a state or not is if you would
   * use let in vanilla JS, or if you are creating something that you wish to be
   * dynamic. Not all variable require state to be attached to them, as this would
   * cause many unecessary re-renderings of the page.
   *
   * To see how much simpler this is than vanilla JS, look at vanilla.html in ./public,
   * as this creates the same project but with vanilla JS.
   */
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // Event handler functions should be defined within the coponent body.
  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    // Using a callback like this is a lot safer than using
    // the current state variable when the value of the current
    // state is needed to generate the next state value.
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">{messages[step - 1]}</p>

          <div className="buttons">
            {/* 
          In JSX we add event listeners to buttons using the inline properties,
          e.g. onCLick for clicking the button, or onMouseEnter for when a cursor
          is over an element.
        */}
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
