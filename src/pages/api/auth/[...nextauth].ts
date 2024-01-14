import NextAuth from "next-auth";
import { authOptions } from "andrewdaotran/server/auth";

export default NextAuth(authOptions);

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST };
