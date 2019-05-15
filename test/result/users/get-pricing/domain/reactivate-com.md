## retrieves com reactivate price
["users.getPricing", {
  "type": "DOMAIN",
  "action": "REACTIVATE",
  "product": "COM"
}]

/* expected */
{
  "domains": {
    "reactivate": {
      "com": [
        {
          "Duration": 1,
          "DurationType": "YEAR",
          "Price": "12.98",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "12.98",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "12.98",
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