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
cd ../frontend
npm start &
export FRONTEND_PID=$!

cd ../backend
npm run test
if [ $? -ne 0 ] 
then
    echo $?
    exit $?
fi

cd ../frontend
npm test -- --watchAll=false
if [ $? -ne 0 ] 
then
    echo $?
    exit $?
fi
npm run cy:run
if [ $? -ne 0 ] 
then
    echo $?
    exit $?
fi

kill $VENDOR_PID
kill $BACKEND_PID
kill $FRONTEND_PID