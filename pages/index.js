import LeadsPage from "../src/components/dashboard/LeadsPage";
import { withUser } from "../src/lib/withUser";
function Leads() {
  return <LeadsPage />;
}
export default withUser(Leads);
