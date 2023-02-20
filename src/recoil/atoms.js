import { atom } from "recoil";

const filterLeadAtom = atom({
  key: "filterLeads", // unique ID (with respect to other atoms/selectors)
  default: {
    search: "",
    lead_status_id: [],
    source_id: [],
    user_id: [],
    contacted_date_from: "",
    contacted_date_to: "",
  },
});

export { filterLeadAtom };
