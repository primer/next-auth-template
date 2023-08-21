# next-primer-auth-kit

This project is a boilerplate to get a GitHub OAuth app quickly up and running.

## Getting Started

First, clone the repo.

- In the root directory, create a new environemnt file called `.env.local`.
- Navigate to https://github.com/settings/developers and create a new oauth app
- Add your client id and secret to your `.env.local` file

```bash
GITHUB_APP_CLIENT_ID=xxx
GITHUB_APP_SECRET=xxx
```

Next, install all the dependencies, and start running the app.

```bash
npm install
# then
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

Here's a list of resources of the different dependencies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Auth.js Documentation](https://authjs.dev/getting-started/oauth-tutorial) - learn about Auth.js features and API.
- [Primer React Documentation](https://primer.style/design/guides/development/react) - learn about Primer features and API.
- [Octokit Repo](https://github.com/octokit/octokit.js) - learn about Octokit features and API.
