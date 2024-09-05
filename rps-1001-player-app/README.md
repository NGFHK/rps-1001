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
openssl genrsa -out private.pem 4096
openssl rsa -in private.pem -pubout -out public.pem
```

Then, copy the content of `public.pem` to somewhere the [Client-side encryptor](../rps-1001-player-app/src/components/EncryptedConfigDialog.tsx) can access.

Note that the byte size of the key pairs should be at least 4096 bits.
Otherwise, the encryption might fail as the config size is too large.
