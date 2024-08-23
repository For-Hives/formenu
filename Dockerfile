FROM node:21-alpine

WORKDIR /usr/app
COPY ./ ./

RUN npm install
RUN npm run build

ENV NEXT_SHARP_PATH=./node_modules/sharp
ENV NODE_ENV production
EXPOSE 3000
CMD ["npm", "start"]
