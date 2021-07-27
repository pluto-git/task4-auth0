import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

function MainNavigation() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <nav className="navbar navbar-light bg-light border-bottom border-left border-right border-info rounded-bottom">
        <Link href="/">
          <a className="navbar-brand">
            <Image
              src="/toppng.com-enguin-penguin-logo-transparent-291x431.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            PENGUIN CLUB
          </a>
        </Link>
        <form className="form-inline">
          {!user && (
            <button className="btn btn-primary btn-lg">
              <Link href="/api/auth/login">Sign In</Link>
            </button>
          )}
          {user && (
            <>
              <button className="btn btn-danger btn-lg super">
                <Link href="/management">User Management</Link>
              </button>
              <button className="btn btn-primary btn-lg">
                <Link href="/api/auth/logout">Log Out</Link>
              </button>
            </>
          )}
        </form>
      </nav>
    </>
  );
}

export default MainNavigation;
