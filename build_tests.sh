trap "exit" INT TERM ERR
trap "kill 0" EXIT

cd vendor
node api.js &
cd ../backend
npm run test

cd ../frontend
npm run test
