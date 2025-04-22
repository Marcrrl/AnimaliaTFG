# Etapa de construcción con Node.js
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build --prod

# Etapa de producción con Nginx
FROM nginx:alpine
COPY --from=build /app/www /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf  
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]