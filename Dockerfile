FROM node
WORKDIR /app

EXPOSE 8080

COPY . /app

RUN npm install \
  && npm run build

CMD ["npm", "start"]