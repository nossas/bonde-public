FROM node:14-alpine

# Configure all env vars to build imagem
ARG SKIP_PREFLIGHT_CHECK
ARG REACT_APP_ENVIRONMENT
ARG REACT_APP_DOMAIN_IMAGINARY
ARG REACT_APP_DOMAIN_ACCOUNTS
ARG REACT_APP_DOMAIN_ADMIN
ARG REACT_APP_DOMAIN_ADMIN_CANARY
ARG REACT_APP_HASURA_API_URL
ARG REACT_APP_DOMAIN_BOT
ARG REACT_APP_DOMAIN_BETA
ARG REACT_APP_AWS_BUCKET
ARG REACT_APP_LOGIN_URL
ARG REACT_APP_DOMAIN_REDES
ARG REACT_APP_UPLOADS_URL
ARG REACT_APP_ZENDESK_ORGANIZATIONS_LAWYER
ARG REACT_APP_ZENDESK_ORGANIZATIONS_INDIVIDUAL
ARG REACT_APP_ZENDESK_ORGANIZATIONS_THERAPIST
ARG REACT_APP_DOMAIN_PUBLIC
ARG REACT_APP_API_GRAPHQL_SECRET
ARG REACT_APP_DOMAIN_API_ACTIVISTS
ARG REACT_APP_DOMAIN_API_GRAPHQL
ARG REACT_APP_DOMAIN_API_REST
ARG REACT_APP_PAGARME_KEY
ARG ACTION_SECRET_KEY
ARG REACT_APP_AWS_ROUTE_IP
ARG REACT_APP_HOTJAR_ID
ARG REACT_APP_HOTJAR_SV

# Print variables config
RUN env

# Install pnpm to manage dependencies commands to build and start
WORKDIR /code

RUN apk --update add curl

RUN curl -L https://unpkg.com/@pnpm/self-installer | env PNPM_VERSION=7.26.1 node

COPY . .

ENV SKIP_PREFLIGHT_CHECK=true

RUN pnpm i

RUN pnpm --filter "./libs/**" m run build

RUN pnpm --filter "./packages/webpage-client" m run build
