# TODO - Jarvis AI + Mojay Courses Backend

## Step 1: Fix server runtime
- [x] Checked server start error: port 5000 already in use (EADDRINUSE)
- [ ] Update server to support PORT override and print clear port in use guidance

## Step 2: Fix MongoDB connection
- [ ] Ensure server uses correct MONGO_URI from env (document required .env variables)
- [ ] Add startup log showing which Mongo URI is used (safe)

## Step 3: Verify endpoints
- [ ] Run server and verify `GET /api/health`
- [ ] Verify auth endpoints: `POST /api/users/register`, `POST /api/users/login`

## Step 4: Minimal backend fixes for correctness
- [ ] Validate JWT_SECRET presence and return helpful error if missing
- [ ] Validate password hashing logic in User model (comparePassword)

## Step 5: Testing commands
- [ ] Provide npm run commands to test API locally (curl/postman)

