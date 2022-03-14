export type BillingPlan = "Free" | "Team";

export type Steps =
  | "ChoosingUpgradePath"
  | "ChoosingPlan"
  | "Upgrading"
  | "Creating"
  | "NamingAccoount"
  | "Inviting"
  | "Importing"
  | "RedirectingToBillingPortal"
  | "Finished";

export type State = {
  accountId?: "string";
  accountName?: string;
  currentStep: Steps;
  history: string[];
  invites?: string;
  imports?: string;
  isUpgrade?: boolean;
  selectedBillingPlan?: BillingPlan;
};

export type Next = {
  type: "Next";
};

export type Previous = {
  type: "Previous";
};

export type ChooseUpgradePath = {
  type: "ChooseUpgradePath";
  isUpgrade: boolean;
};

export type NameAccount = {
  type: "NameAccount";
  accountName: string;
};

export type Invite = {
  type: "Invite";
  invites: string;
};

export type Import = {
  type: "Import";
  imports: string;
};

export type ChooseBillingPlan = {
  type: "ChooseBillingPlan";
  selectedBillingPlan: BillingPlan;
};

export type Actions =
  | Next
  | Previous
  | ChooseUpgradePath
  | ChooseBillingPlan
  | NameAccount
  | Import
  | Invite;
