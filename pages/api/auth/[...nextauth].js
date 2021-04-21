import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    // OAuth authentication providers...
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Passwordless / email sign in
    // Providers.Email({
    //   server: {
    //     host: process.env.MAIL_SERVER_HOST,
    //     port: process.env.MAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.MAIL_SERVER_USER,
    //       pass: process.env.MAIL_SERVER_PASSWORD,
    //     },
    //     from: process.env.MAIL_SERVER_FROM,
    //   },
    // }),
    //   Providers.Auth0({
    //     clientId: process.env.AUTH0_CLIENT_ID,
    //     clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //     domain: process.env.AUTH0_CLIENT_DOMAIN,
    //   }),
  ],
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL,
  database: {
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "password",
    database: "recipe",
  },
};

export default (req, res) => NextAuth(req, res, options);
