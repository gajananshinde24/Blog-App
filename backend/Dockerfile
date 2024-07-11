# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./



RUN npm install

# Copy the remaining app code
COPY . .

# Expose the port the app runs on
EXPOSE 3004

# Start the app
CMD ["npm", "start"]
