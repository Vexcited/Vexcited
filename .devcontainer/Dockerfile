FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:18-bullseye

ARG NODE_VERSION="18"
COPY library-scripts/desktop-lite-debian.sh /tmp/library-scripts/
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
	&& bash /tmp/library-scripts/desktop-lite-debian.sh \
	&& apt-get -y install chromium firefox-esr \
        && wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg \
           | gpg --dearmor \
           | dd of=/usr/share/keyrings/vscodium-archive-keyring.gpg \
        && echo 'deb [ signed-by=/usr/share/keyrings/vscodium-archive-keyring.gpg ] https://paulcarroty.gitlab.io/vscodium-deb-rpm-repo/debs vscodium main' \
           | tee /etc/apt/sources.list.d/vscodium.list \
        && apt-get update && apt-get install codium \
	&& bash -c ". /usr/local/share/nvm/nvm.sh && nvm alias ${VARIANT} system" \
	&& apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/

# Core environment variables for X11, VNC, and fluxbox
ENV DBUS_SESSION_BUS_ADDRESS="autolaunch:" \
	VNC_RESOLUTION="1440x768x16" \
	VNC_DPI="96" \
	VNC_PORT="5901" \
	NOVNC_PORT="6080" \
	DISPLAY=":1" \
	LANG="en_US.UTF-8" \
	LANGUAGE="en_US.UTF-8"

ENTRYPOINT ["/usr/local/share/desktop-init.sh"]
CMD ["sleep", "infinity"]
