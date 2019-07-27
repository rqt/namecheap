```## async getPricing => Pricing
[
  ["options", "GetPricing"]
]
```

Returns pricing information for a requested product type.

%TYPEDEF types/api/users/get-pricing.xml GetPricing%

The returned object will contain data according to requested types, categories, actions and products.

%EXAMPLE: example/api/users/get-pricing%

%TYPEDEF types/api/users/get-pricing.xml Pricing%

%TYPEDEF types/api/users/get-pricing.xml Product%

%TYPEDEF types/api/users/get-pricing.xml Price%

%TYPEDEF types/api/users/get-pricing.xml DomainPricing%

%TYPEDEF types/api/users/get-pricing.xml SSLPricing%

<details>
<summary>Show SSL Product Pricing</summary>

<typedef narrow flatten>types/api/users/pricing/ssl.xml</typedef>
</details>
<br/>

%TYPEDEF types/api/users/get-pricing.xml WhoisPricing%

<details>
<summary>Show Whois Product Pricing</summary>

<typedef narrow flatten>types/api/users/pricing/whois.xml</typedef>
</details>
<br/>

<details>
<summary>Show Example COM Domain Registration Pricing Output</summary>

%FORK-json5 example/run/users/get-pricing%
</details>

[Show Example SSL Purchase Pricing Output](https://github.com/rqt/namecheap/blob/master/doc/ssl-pricing.md)

<!-- > When checking certificates pricing, the product names are returned in `camelCase` rather than `hyphen-case` received from NameCheap (e.g., `positivesslWildcard` instead of `positivessl-wildcard`) because some IDEs do not support JSDoc with properties containing hyphens. -->

<!-- %~ width="15"% -->