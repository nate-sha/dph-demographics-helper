# Build environment
# Select the base image
FROM node:18-alpine as react-build
# Set the working directory
WORKDIR /app
# Copy all files from the current directory to the working directory
COPY . .
# Install packages
RUN npm install --silent
# Build the app
RUN npm run build

# Server environment
FROM nginx:alpine
# Copy server configuration
COPY nginx.conf /etc/nginx/conf.d/configfile.template
# Copy the react app build from the previous stage
COPY --from=react-build /app/build /usr/share/nginx/html
# Set the host, port and the command to run the server
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
# Run the server
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"