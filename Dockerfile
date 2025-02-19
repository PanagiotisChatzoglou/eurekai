# 1️⃣ Use Alpine Linux as the base image (lightweight & secure)
FROM node:18-alpine AS builder

# 2️⃣ Install OpenSSL 3 (to support Prisma)
RUN apk add --no-cache openssl3 libssl3

# 3️⃣ Set working directory inside the container
WORKDIR /app

# 4️⃣ Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# 5️⃣ Copy the rest of the application files
COPY . .

# 6️⃣ Generate Prisma client with the correct binary for Linux
RUN npx prisma generate

# 7️⃣ Build the Next.js app
RUN npm run build

# 8️⃣ Create a lightweight runtime image
FROM node:18-alpine AS runner

# 9️⃣ Install OpenSSL in the runtime environment
RUN apk add --no-cache openssl3 libssl3

WORKDIR /app

# 🔟 Copy built files from builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json

# 1️⃣1️⃣ Set environment variables
ENV PORT=80
ENV NODE_ENV=production

# 1️⃣2️⃣ Expose the necessary port
EXPOSE 80

# 1️⃣3️⃣ Start the Next.js server
CMD ["npm", "run", "start"]