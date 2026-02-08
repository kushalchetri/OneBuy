FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# --host is needed to expose the Vite server to the network
CMD ["npm", "run", "dev", "--", "--host"]
