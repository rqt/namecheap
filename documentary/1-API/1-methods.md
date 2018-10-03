## `domains`

Methods to register and retrieve domains' info.

%~ width="15"%

```### async create => RegistrationResult
[
  ["options", "Create"]
]
```

Register a domain.

%TYPEDEF types/api/domains/create.xml%

%EXAMPLE: example/api/domains/create.js%
%FORK example example/run/domains/create.js%

%~ width="15"%

```### async check => DomainCheck[]
[
  ["options", "string|Check"]
]
```

Check a domain or domains for availability.

%TYPEDEF types/api/domains/check.xml%

%EXAMPLE: example/api/domains/check.js%
%FORK example example/run/domains/check.js%

%~ width="15"%

```### async getInfo => DomainInfo
[
  ["options", "string|GetInfo"]
]
```

Returns information about the requested domain.

%TYPEDEF types/api/domains/get-info.xml%

%EXAMPLE: example/api/domains/get-info.js%
%FORK example example/run/domains/get-info.js%

%~ width="15"%

```### async getList => { domains, TotalItems, CurrentPage, PageSize }
[
  ["options?", "GetList"]
]
```

Returns a list of domains for the particular user.

%TYPEDEF types/api/domains/get-list.xml%

%EXAMPLE: example/api/domains/get-list.js%
%FORK example example/run/domains/get-list.js%

%~%