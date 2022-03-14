import "./styles.css";
import React from "react";
import { reducer } from "./reducer";
import { BillingPlan } from "./types";

export default function App() {
  const timeout = React.useRef<number>();
  const [state, dispatch] = React.useReducer(reducer, {
    currentStep: "ChoosingUpgradePath",
    selectedBillingPlan: "Free",
    isUpgrade: false,
    history: []
  });

  function nextStep(e?: React.FormEvent) {
    e?.preventDefault();
    dispatch({
      type: "Next"
    });
  }

  function previouStep(e?: React.FormEvent) {
    e?.preventDefault();
    dispatch({
      type: "Previous"
    });
  }

  function chooseUpgradePlan(isUpgrade: boolean) {
    dispatch({
      type: "ChooseUpgradePath",
      isUpgrade
    });
  }

  function nameAccount(accountName: string) {
    dispatch({
      type: "NameAccount",
      accountName
    });
  }

  function invite(invites: string) {
    dispatch({
      type: "Invite",
      invites
    });
  }

  function importMaps(imports: string) {
    dispatch({
      type: "Import",
      imports
    });
  }

  function choosePlan(selectedBillingPlan: BillingPlan) {
    dispatch({
      type: "ChooseBillingPlan",
      selectedBillingPlan
    });
  }

  // Hook into any external apis like a database or the dom
  React.useEffect(() => {
    state.history.push(state.currentStep); // debug - Pepper
    switch (state.currentStep) {
      // create or upgrade the account then next step
      case "Creating":
      case "Upgrading":
        timeout.current = setTimeout(() => {
          nextStep();
        }, 1000);
        break;
      // Redirect to billing portal and back
      case "RedirectingToBillingPortal":
        timeout.current = setTimeout(() => {
          nextStep();
        }, 1000);
        break;
      // Send the user back to whence they came
      case "Finished":
        break;
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [state.currentStep, state.history]);

  return (
    <section className="App">
      <h3>Current step: {state.currentStep}</h3>
      {
        {
          ChoosingUpgradePath: (
            <form onSubmit={nextStep}>
              <label>
                <input
                  type="radio"
                  checked={!state.isUpgrade}
                  onChange={() => chooseUpgradePlan(false)}
                />
                Create a new account
              </label>
              <label>
                <input
                  type="radio"
                  checked={state.isUpgrade}
                  onChange={() => chooseUpgradePlan(true)}
                />
                Upgrade an account
              </label>
              <button type="submit">Next</button>
            </form>
          ),
          ChoosingPlan: (
            <form onSubmit={nextStep}>
              <button type="button" onClick={previouStep}>
                Back
              </button>
              <label>
                <input
                  type="radio"
                  checked={state.selectedBillingPlan === "Free"}
                  onChange={() => choosePlan("Free")}
                />
                Free
              </label>
              <label>
                <input
                  type="radio"
                  checked={state.selectedBillingPlan === "Team"}
                  onChange={() => choosePlan("Team")}
                />
                Team
              </label>
              <button type="submit">Next</button>
            </form>
          ),
          NamingAccoount: (
            <form onSubmit={nextStep}>
              <button type="button" onClick={previouStep}>
                Back
              </button>
              <input
                required
                type="text"
                onChange={(e) => nameAccount(e.currentTarget.value)}
              />
              <p>Name the new account</p>
              <button type="submit">Next</button>
            </form>
          ),
          Inviting: (
            <form onSubmit={nextStep}>
              <p>Invite users</p>
              <input
                type="text"
                onChange={(e) => invite(e.currentTarget.value)}
              />
              <button type="submit">Next</button>
            </form>
          ),
          Importing: (
            <form onSubmit={nextStep}>
              <button type="button" onClick={previouStep}>
                Back
              </button>
              <p>Import maps</p>
              <input
                type="text"
                onChange={(e) => importMaps(e.currentTarget.value)}
              />
              <button type="submit">Next</button>
            </form>
          ),
          RedirectingToBillingPortal: <p>Redirecting to the billing portal</p>,
          Creating: <p>Creating an account...</p>,
          Upgrading: <p>Upgrading an account...</p>,
          Finished: <p>Finished - Go back to where the user started</p>
        }[state.currentStep]
      }
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </section>
  );
}
