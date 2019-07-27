## retrieves SSL purchase price
["users.getPricing", {
  "type": "SSLCERTIFICATE",
  "action": "PURCHASE",
  "product": "INSTANTSSL"
}]

/* expected */
{
  "ssl": {
    "purchase": {
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