```## async setHosts => { Domain: string, IsSuccess: boolean }
[
  ["domain", "string"],
  ["hosts", "!Array<!HostParams>"],
  ["opts", "!DNSSetOptions"]
]
```

Sets all hosts on the domain to the given array. All hosts will be overridden, and those not present in _hosts_ array will be removed. The example shows how to _update_ hosts.

<typedef narrow flatten>types/api/dns/params.xml</typedef>

%EXAMPLE: example/run/dns/set-hosts%
%FORK-js example/run/dns/set-hosts%

<!-- %~ width="25"% -->