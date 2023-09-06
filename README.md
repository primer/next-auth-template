# next-auth-template

This project is a template to help get a GitHub OAuth app quickly up and running with Next.js and Primer.

## Getting Started

1. Create a new repo using this template.
1. In the root directory, create a new environment file called `.env.local`.
1. Navigate to https://github.com/settings/developers and create a new OAuth app.
    - Set the authorization callback URL to `http://localhost:3000/api/auth/callback/github`.
1. Add your app's client id and secret and the following variable to your `.env.local` file:
    
    ```yaml
    GITHUB_APP_CLIENT_ID=xxx
    GITHUB_APP_SECRET=xxx
    NEXTAUTH_SECRET=xxx
    ```
    
    For the `NEXTAUTH_SECRET`, you can generate a random value in the command line via this `openssl` command:

    ```shell
    openssl rand -base64 32`
    ```

1. Finally, install all the dependencies, and start running the app.

    ```shell
    npm install
    # then
    npm run dev
    ```
    
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

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

## Deployment

Follow Auth.js's [deployment documentation](https://authjs.dev/guides/basics/deployment) to deploy your app via Vercel.

## Learn More

Here's a list of resources of the different dependencies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Auth.js Documentation](https://authjs.dev/getting-started/oauth-tutorial) - learn about Auth.js features and API.
- [Primer React Documentation](https://primer.style/design/guides/development/react) - learn about Primer features and API.
- [Octokit Repo](https://github.com/octokit/octokit.js) - learn about Octokit features and API.
