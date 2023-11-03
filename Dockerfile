FROM node:20-slim
WORKDIR /opt/freelancer
COPY . .
RUN npm install
ENV PORT=3000
CMD ["npm", "start"]