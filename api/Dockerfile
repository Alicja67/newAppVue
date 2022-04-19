FROM node:fermium-buster-slim
WORKDIR /api
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
# RUN yarn build
EXPOSE 3000
CMD ["yarn","start"]
