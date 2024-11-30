FROM node:19-alpine3.15 AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:19-alpine3.15 AS build
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:app

FROM nginx:1.23.3 AS prod
EXPOSE 80

COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
