# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000



# Start the React app
CMD ["npm", "start"]
