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
          "Price": "31.98",
          "PricingType": "MULTIPLE",
          "RegularPrice": "39.00",
          "RegularPriceType": "MULTIPLE",
          "YourPrice": "31.98",
          "YourPriceType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 2,
          "DurationType": "YEAR",
          "Price": "30.75",
          "PricingType": "MULTIPLE",
          "RegularPrice": "37.50",
          "RegularPriceType": "MULTIPLE",
          "YourPrice": "30.75",
          "YourPriceType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        }
      ]
    }
  }
}
/**/