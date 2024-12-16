## Development

Development Steps to set up the application in development

### Install dependencies
```
pnpm i
```
### Create secret token
```
npx auth secret
```
### Create a .env file in the root of project with the following content:
```
DATABASE_URL="file:./dev.db"
```
### Create the Prisma client
```
npx prisma generate
```

### Migrate data
```
npx prisma migrate dev
```

### Run the application
```
pnpm run dev
```

### Populate the database with test users
Open your browser and navigate to the following URL, or simply <a href="http://localhost:3000/api/seed" target="_blank">Click here</a> to populate the database with test users.
```
http://localhost:3000/api/seed
```

## Users Credentials
### Admin
- email: admin@test.com
- password: admin
### User
- email:user@test.com
- password: user