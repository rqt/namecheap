## retrieves com transfer price
["users.getPricing", {
  "type": "DOMAIN",
  "action": "TRANSFER",
  "product": "COM"
}]

/* expected */
{
  "domains": {
    "transfer": {
      "com": [
        {
          "Duration": 1,
          "DurationType": "YEAR",
          "Price": "8.88",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "9.69",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "8.88",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        }
      ]
    }
  }
}
/**/