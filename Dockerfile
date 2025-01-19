FROM node:22.13.0
WORKDIR /feni_city_backend
COPY . .
EXPOSE 9000
RUN npm install
CMD [ "node","index" ]