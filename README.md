# Web Technology Lab

## Recipe App that lets you save and edit recipes

created by

- Ondra
- Adam
- Constantin

## How to run this project

- start MongoDB instance:
  - docker run -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo
- start backend:
  - cd backend
  - npm install
  - npm run dev
- start frontend:
  - cd frontend
  - npm install
  - npx expo start
  - Download and open Expo App (Expo Go) and scan screenshot from console
- Initialize content:
  - In the browser paste: http://localhost:4000/initialize
