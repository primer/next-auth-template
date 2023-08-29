# next-auth-template

This project is a template to help get a GitHub OAuth app quickly up and running with Next.js and Primer.

## Getting Started

First, clone the repo.

- In the root directory, create a new environemnt file called `.env.local`.
- Navigate to https://github.com/settings/developers and create a new oauth app
- Set the callback URL to `http://localhost:3000/api/auth/callback/github`
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

## Using the Rest API

Navigate to `pages/rest-api.tsx` and take a look around. You'll notice that it makes a call `const { data } = await octokit?.request("GET /notifications");`.

To make this work, you need to have the correct **scopes** in place. To modify scopes, go to the `api/[...nextauth].ts` file. You can modify the scopes by changing the scope object here:

```jsx
 providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID,
      clientSecret: process.env.GITHUB_APP_SECRET,
      authorization: {
        params: { scope: "read:user user:email notifications public_repo" },
      },
    }),
  ],
```

List of all available scopes from the GitHub API for OAuth apps:
https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps

## Using GraphQL

Navigate to `pages/graphql.tsx` a take a look around. You'll notice the following call:

```jsx
async function getFollowers() {
  const query = `
      query {
        viewer {
          followers(first: 10) {
            nodes {
              name
              login
              avatarUrl
            }
          }
        }
      }
    `;
  const { viewer } = await client?.graphql(query);
}
```

You can modify the data that is being pulled in by changing this query.

GitHub API GraphQL explorer:
https://docs.github.com/en/graphql/overview/explorer

## Learn More

Here's a list of resources of the different dependencies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Auth.js Documentation](https://authjs.dev/getting-started/oauth-tutorial) - learn about Auth.js features and API.
- [Primer React Documentation](https://primer.style/design/guides/development/react) - learn about Primer features and API.
- [Octokit Repo](https://github.com/octokit/octokit.js) - learn about Octokit features and API.
