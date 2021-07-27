import UserManagement from "../components/user-management/user-management";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function Management() {
  return <UserManagement />;
});

