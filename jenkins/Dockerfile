FROM jenkins/jenkins:lts-jdk21

USER root

RUN apt-get update && \
    apt-get install -y \
      ca-certificates \
      curl \
      unzip \
      git \
      jq \
      docker.io && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" \
    -o /tmp/awscliv2.zip && \
    unzip -q /tmp/awscliv2.zip -d /tmp && \
    /tmp/aws/install && \
    rm -rf /tmp/aws /tmp/awscliv2.zip

RUN curl -fsSL -o /usr/local/bin/kubectl \
    "https://dl.k8s.io/release/v1.33.13/bin/linux/amd64/kubectl" && \
    chmod +x /usr/local/bin/kubectl

RUN curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-4 | bash

# Docker Desktop exposes /var/run/docker.sock as root:root.
# Add Jenkins to the root group so it can access the Docker daemon.
RUN usermod -aG root jenkins

USER jenkins