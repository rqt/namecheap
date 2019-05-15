## retrieves SSL renew price
["users.getPricing", {
  "type": "SSLCERTIFICATE",
  "action": "RENEW",
  "product": "INSTANTSSL"
}]

/* expected */
{
  "ssl": {
    "renew": {
      "instantssl": [
        {
          "Duration": 1,
          "DurationType": "YEAR",
          "Price": "18.88",
          "PricingType": "MULTIPLE",
          "RegularPrice": "39.00",
          "RegularPriceType": "MULTIPLE",
          "YourPrice": "18.88",
          "YourPriceType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 2,
          "DurationType": "YEAR",
          "Price": "20.88",
          "PricingType": "MULTIPLE",
          "RegularPrice": "37.50",
          "RegularPriceType": "MULTIPLE",
          "YourPrice": "20.88",
          "YourPriceType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        }
      ]
    }
  }
}
/**/