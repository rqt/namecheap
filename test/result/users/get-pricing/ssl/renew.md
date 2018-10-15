// retrieves SSL renew price
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
          "Price": "39.00",
          "PricingType": "MULTIPLE",
          "RegularPrice": "39.00",
          "RegularPriceType": "MULTIPLE",
          "YourPrice": "39.00",
          "YourPriceType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 2,
          "DurationType": "YEAR",
          "Price": "37.50",
          "PricingType": "MULTIPLE",
          "RegularPrice": "37.50",
          "RegularPriceType": "MULTIPLE",
          "YourPrice": "37.50",
          "YourPriceType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        }
      ]
    }
  }
}
/**/