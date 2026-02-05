#Buiding Stage image 

FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY src ./src

#RUNTIME 
FROM node:18-alpine 
WORKDIR /app
COPY --from=builder /app .
EXOPOSE 3000
CMD ["npm","start"]
