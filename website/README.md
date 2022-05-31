# Vexcited's Website [![Deploy Website](https://github.com/Vexcited/Vexcited/actions/workflows/website-deploy.yml/badge.svg)](https://vexcited.vercel.app/)

Made with [Solid](https://solidjs.com), [WindiCSS](https://windicss.org) and deployed on [Vercel](https://vercel.com). 

I use a [GitHub Action to deploy to Vercel](https://github.com/marketplace/actions/vercel-action) to prevent deploying changes on README updates made for WakaTime tracking.

## Development

`git clone https://github.com/Vexcited/Vexcited`, `cd ./Vexcited/website` and run `pnpm install` to install dependencies.

Use `pnpm dev` to start Vite development server
or `pnpm build` to build into the `./dist` folder.

Also, use lint the code using `pnpm lint` and fix the styling errors with `pnpm lint --fix`.
