FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:18-bullseye

ARG NODE_VERSION="18"
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
	&& wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg \
           | gpg --dearmor \
           | dd of=/usr/share/keyrings/vscodium-archive-keyring.gpg \
        && echo 'deb [ signed-by=/usr/share/keyrings/vscodium-archive-keyring.gpg ] https://paulcarroty.gitlab.io/vscodium-deb-rpm-repo/debs vscodium main' \
           | tee /etc/apt/sources.list.d/vscodium.list \
        && apt-get update && apt-get install -y codium \
	&& bash -c ". /usr/local/share/nvm/nvm.sh && nvm alias ${VARIANT} system" \
	&& apt-get clean -y \
        && rm -rf /var/lib/apt/lists/* \
        && node -c "npm install -g pnpm"
