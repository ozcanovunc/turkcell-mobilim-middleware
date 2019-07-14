curl -0 -v -X POST localhost:80/mobile/price/hotel \
-d \
'{
            "otelId": 25,
            "startDate": "2019-02-22T08:22:54",
            "endDate": "2019-02-28T08:22:54",
            "roomType": "S",
            "accommodationType": "BB"

}'

# Returns
# {
#     "price": "666,72TL"
# }
