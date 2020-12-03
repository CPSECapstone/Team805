trap "exit" INT TERM ERR
trap "kill 0" EXIT

cd vendor
npm install
cd ../backend
npm install
cd ../frontend
npm install

cd ../vendor
node api.js &
cd ../backend
npm run test

cd ../frontend
npm test -- --watchAll=false
