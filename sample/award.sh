curl -0 -v -X POST localhost:80/web/award/addFunds \
-d \
'{ "userID": "ozcanovunc", "funds": 200 }'
# Returns
# {}

curl --request GET localhost:80/web/award/users
# Returns
# [
#     {
#         "userID": "TCUERDEM",
#         "funds": 0,
#         "receivedAwards": [],
#         "givenAwards": []
#     }
# ]

curl -0 -v -X POST localhost:80/mobile/award/sendAward \
-d \
'{ "userIDFrom": "ozcanovunc", "userIDTo": "alnyli07", "awardID": "123456" }'
# Returns
# {}

curl --request GET localhost:80/mobile/award/alnyli07
# Returns
# {
#     "userID": "alnyli07",
#     "funds": 200,
#     "receivedAwards": [],
#     "givenAwards": []
# }

curl --request GET localhost:80/mobile/award
# Returns 
# [
#     {
#         "Aciklama": "Lorem ipsum dolor sit amet",
#         "Adet": 10,
#         "Fiyat": 100,
#         "Kod": "418FB595"
#     }
# ]
