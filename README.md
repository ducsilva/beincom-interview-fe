This is a [Beincom](https://github.com/ducsilva/beincom-interview-fe) project bootstrapped with [`next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, you need to clone the project:

```bash
git clone git@github.com:ducsilva/beincom-interview-fe.git
```

After cloning the project, you need to install the required packages:

```bash
yarn install
```

## Creating a new environment variable:

In the root of the project, you can create a new environment file named: .env. You have two options to configure the environment to run the FE project:

## Options 1: Copy the environment variables below into the .env file inside the FE project:

BASE_URL=https://beincom-interview-be.onrender.com/api/v1/

## Options 2: Run a private server from this repository:

```bash
git clone git@github.com:ducsilva/beincom-interview-be.git
```

After cloning the BE project, you need to install the required packages:

```bash
yarn install
```

# Add a .env file in the root of the BE server with the following content:

PORT = 4000
JWT_SECRET=5b5d4373b52394e8bc6be526991585de3e9726439586f80d3f2697169526ab9b
MONGOOSE_URI=mongodb+srv://ducsilva1307:Minhduc13071992%40@trungka.xpiqot3.mongodb.net/beincom-interview?retryWrites=true&w=majority&appName=trungka
CLOUDINARY_NAME=dsy1sswel
CLOUDINARY_API_KEY=145857621656138
CLOUDINARY_API_SECRET=52ObYXCPksyTZLnlvvOKC52R4WI

# Then run the server with:

```bash
yarn start:dev
```

Your server will listen port 4000

##### Now, copy the following line into the .env file of the FE project. Your FE project will listen to the server with:

```bash
BASE_URL=http://localhost:4000/api/v1/
```

# IMPORTANT IF YOU CHOICE OPTIONS 1:

My server hosted with BASE_URL = https://beincom-interview-be.onrender.com/api/v1/ will take at least 60 seconds to wake up. Because I'm using a trial plan of a third-party service, free instances spin down after periods of inactivity.
