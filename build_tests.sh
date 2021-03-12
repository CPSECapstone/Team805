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
node server.js &
export BACKEND_PID=$!

sleep 3

cd ../backend
npm run test
if [ $? -ne 0] 
then
    exit $?

cd ../frontend
npm test -- --watchAll=false
npm run cy:run

kill $VENDOR_PID
kill $BACKEND_PID