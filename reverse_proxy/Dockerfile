FROM nginx
RUN rm /usr/share/nginx/html/*
COPY mime /etc/nginx/mime.types
COPY first.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
