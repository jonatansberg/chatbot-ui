import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    async authorized({ token }) {
      if (process.env.NEXTAUTH_ENABLED === 'false') {
        return true;
      }

      if (token?.name && !token?.email) {
        return false;
      } else {
        const pattern = process.env.NEXTAUTH_EMAIL_DOMAIN || '';
        if (!pattern || token?.email?.endsWith(pattern)) {
          return true;
        }
        return false;
      }
    },
  },
});

export const config = { matcher: ['/'] };
