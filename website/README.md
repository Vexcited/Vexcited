# Vexcited's Website [![Deploy Website](https://github.com/Vexcited/Vexcited/actions/workflows/website-deploy.yml/badge.svg)](https://github.com/Vexcited/Vexcited/actions/workflows/website-deploy.yml)

Deployed with Vercel and boostrapped with `vite`.

You can see the production build on [my website](https://www.vexcited.me).

I deploy to Vercel manually with `vercel-action` to prevent a new build run every time GitHub Actions updates my README.

## Installation

Clone the repo, `cd website` and run `yarn` to install depedencies.
Then type `yarn dev` to start Vite development server
or type `yarn build` to run the Vite build script (build folder will be `/dist`).