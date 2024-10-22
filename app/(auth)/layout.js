import { logout } from '@/actions/auth-actions';
import { verifyAuth } from '@/lib/auth';
import { getUserById } from '@/lib/user';
import '../globals.css';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

export default async function AuthRootLayout({ children }) {
  const result = await verifyAuth();
  const user = await getUserById(result?.user?.id)

  return (
    <>
      <header id="auth-header">
        <p title={user.email}>Welcome back {user.firstname} {user.lastname}!</p>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
