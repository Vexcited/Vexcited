FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:18-bullseye

ARG NODE_VERSION="18"
RUN bash -c ". /usr/local/share/nvm/nvm.sh && nvm alias ${VARIANT} system"

CMD ["sleep", "infinity"]
