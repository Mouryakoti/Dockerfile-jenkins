FROM nginx:alpine
MAINTAINER Mourya
LABEL automating the Dockerfile with jenkins
COPY Dockefile-jenkins /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
