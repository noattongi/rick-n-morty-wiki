# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Build the Next.js app
ARG NEXT_BUILD
ENV NEXT_BUILD=${NEXT_BUILD}
RUN npm run build

# Expose the default Next.js port (3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]