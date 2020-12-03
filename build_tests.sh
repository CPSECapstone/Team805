cd vendor
npm install
cd ../backend
npm install
cd ../frontend
npm install

cd ../vendor
node api.js &
export VENDOR_PID=$!
cd ../backend
npm run test

cd ../frontend
npm test -- --watchAll=false
kill $VENDOR_PID
