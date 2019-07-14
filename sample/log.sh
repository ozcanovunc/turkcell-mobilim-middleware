curl -0 -v -X POST localhost:80/mobile/log \
-d \
'{
            "index": "mobile",
            "type": "error",
            "message": "Something went wrong",
}'

# Returns
# {}
