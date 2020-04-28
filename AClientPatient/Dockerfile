#Create docker image for deployment on server
#FROM latest node:alpine not supported node version mismatch ERROR
FROM node:12.6-alpine AS builder

WORKDIR /app

COPY ./package.json ./

#RUN npm install --e
RUN npm install

#RUN npm install -g @angular/cli@7.3.8
#RUN npm install -g @angular/cli@9.0.2
#RUN ng --version

COPY . /app

#RUN ng build
#RUN npm run build:aot:dev

#RUN ls -al /app/

CMD npm start

#FROM nginx:alpine

#RUN rm -rf /usr/share/nginx/html/*

#COPY --from=builder /app/dist/* /usr/share/nginx/html/

#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
