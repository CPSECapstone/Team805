trap "exit" INT TERM ERR
trap "kill 0" EXIT

cd vendor
npm install
node api.js &
cd ../backend
npm install
npm run test

cd ../frontend
npm install
npm test -- --watchAll=false
