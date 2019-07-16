curl -0 -v -X POST localhost:80/mobile/login \
-d \
'{ "userID": "ozcanovunc" }'

# Returns
# {}

curl -0 -v -X POST localhost:80/web/login \
-d \
'{ "userID": "admin" }'

# Returns
# {}
