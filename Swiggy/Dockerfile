FROM node:16-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_VERSION=2.0
EXPOSE 3000
CMD ["npm", "start"]