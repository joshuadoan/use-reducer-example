import { Actions, State } from "./types";

function next(state: State): State {
  // We can rely on thestate to make conditions here
  switch (state.currentStep) {
    case "ChoosingUpgradePath":
      return { ...state, currentStep: "ChoosingPlan" };
    case "ChoosingPlan":
      return state.isUpgrade
        ? { ...state, currentStep: "Upgrading" }
        : { ...state, currentStep: "NamingAccoount" };
    case "NamingAccoount":
      return { ...state, currentStep: "Creating" };
    case "Creating":
    case "Upgrading":
      return state.selectedBillingPlan === "Team"
        ? { ...state, currentStep: "RedirectingToBillingPortal" }
        : { ...state, currentStep: "Inviting" };
    case "RedirectingToBillingPortal":
      return { ...state, currentStep: "Inviting" };
    case "Inviting":
      return { ...state, currentStep: "Importing" };
    case "Importing":
      return { ...state, currentStep: "Finished" };
    default:
      return state;
  }
}

function previous(state: State): State {
  switch (state.currentStep) {
    case "ChoosingPlan":
      return { ...state, currentStep: "ChoosingUpgradePath" };
    case "NamingAccoount":
      return { ...state, currentStep: "ChoosingPlan" };
    case "Importing":
      return { ...state, currentStep: "Inviting" };
    default:
      return state;
  }
}

export function reducer(state: State, event: Actions): State {
  switch (event.type) {
    case "Next":
      return next(state);
    case "Previous":
      return previous(state);
    case "ChooseUpgradePath":
      return { ...state, isUpgrade: event.isUpgrade };
    case "ChooseBillingPlan":
      return { ...state, selectedBillingPlan: event.selectedBillingPlan };
    case "NameAccount":
      return { ...state, accountName: event.accountName };
    case "Invite":
      return { ...state, accountName: event.invites };
    case "Import":
      return { ...state, accountName: event.imports };
    default:
      return state;
  }
}
