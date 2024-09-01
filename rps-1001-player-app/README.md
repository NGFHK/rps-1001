# rps-1001-player-app

## Getting Started

To start developing:

```bash
npm run dev
```

Note that it runs `vite dev --host` under the hood to allow access from other devices on the same network.

## GitHub Pages Deployment

This app is configured with GitHub Actions to deploy to GitHub Pages on every push to the `main` branch.
See also the [GitHub Actions workflow file](../.github/workflows/deploy.yml).

## Key generation

Here is an example of how to generate a key pairs and apply them to the app.

Run the following commands in the [keys](../keys/) directory.

```bash
openssl genrsa > alpha_private.pem
openssl rsa -in alpha_private.pem -pubout -out alpha_public.pem
```

With this, copy the content of `alpha_public.pem` to the [default_pub.txt](./src/assets/default_pub.txt) file.
