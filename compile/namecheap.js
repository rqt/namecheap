#!/usr/bin/env node
             
const os = require('os');
const querystring = require('querystring');
const https = require('https');
const http = require('http');
const util = require('util');
const url = require('url');
const zlib = require('zlib');
const stream = require('stream');             
const h = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, x = (a, b = !1) => h(a, 2 + (b ? 1 : 0)), y = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:A} = os;
const B = /\s+at.*(?:\(|\s)(.*)\)?/, C = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, D = A(), E = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = new RegExp(C.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(e => {
    e = e.match(B);
    if (null === e || !e[1]) {
      return !0;
    }
    e = e[1];
    return e.includes(".app/Contents/Resources/electron.asar") || e.includes(".app/Contents/Resources/default_app.asar") ? !1 : !d.test(e);
  }).filter(e => e.trim()).map(e => b ? e.replace(B, (g, f) => g.replace(f, f.replace(D, "~"))) : e).join("\n");
};
function F(a, b, c = !1) {
  return function(d) {
    var e = y(arguments), {stack:g} = Error();
    const f = h(g, 2, !0), l = (g = d instanceof Error) ? d.message : d;
    e = [`Error: ${l}`, ...null !== e && a === e || c ? [b] : [f, b]].join("\n");
    e = E(e);
    return Object.assign(g ? d : Error(), {message:l, stack:e});
  };
}
;function G(a) {
  var {stack:b} = Error();
  const c = y(arguments);
  b = x(b, a);
  return F(c, b, a);
}
;const {request:K} = https;
const {request:L} = http;
const {debuglog:M} = util;
const {parse:N} = url;
const {Writable:O} = stream;
const P = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class aa extends O {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {g:e = G(!0), proxyError:g} = a || {}, f = (l, k) => e(k);
    super(d);
    this.f = [];
    this.o = new Promise((l, k) => {
      this.on("finish", () => {
        let m;
        b ? m = Buffer.concat(this.f) : m = this.f.join("");
        l(m);
        this.f = [];
      });
      this.once("error", m => {
        if (-1 == m.stack.indexOf("\n")) {
          f`${m}`;
        } else {
          const q = E(m.stack);
          m.stack = q;
          g && f`${m}`;
        }
        k(m);
      });
      c && P(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.f.push(a);
    c();
  }
  get h() {
    return this.o;
  }
}
const ba = async(a, b = {}) => {
  ({h:a} = new aa({rs:a, ...b, g:G(!0)}));
  return await a;
};
const {createGunzip:ca} = zlib;
const da = a => {
  ({"content-encoding":a} = a.headers);
  return "gzip" == a;
}, ea = (a, b, c = {}) => {
  const {justHeaders:d, binary:e, g = G(!0)} = c;
  let f, l, k, m, q = 0, u = 0;
  c = (new Promise((v, w) => {
    f = a(b, async n => {
      ({headers:l} = n);
      const {statusMessage:p, statusCode:r} = n;
      k = {statusMessage:p, statusCode:r};
      if (d) {
        n.destroy();
      } else {
        var t = da(n);
        n.on("data", z => q += z.byteLength);
        n = t ? n.pipe(ca()) : n;
        m = await ba(n, {binary:e});
        u = m.length;
      }
      v();
    }).on("error", n => {
      n = g(n);
      w(n);
    }).on("timeout", () => {
      f.abort();
    });
  })).then(() => ({body:m, headers:l, ...k, A:q, byteLength:u, i:null}));
  return {B:f, h:c};
};
const fa = (a = {}) => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(d)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), ha = async(a, b, {data:c, justHeaders:d, binary:e, g = G(!0)}) => {
  const {B:f, h:l} = ea(a, b, {justHeaders:d, binary:e, g});
  f.end(c);
  a = await l;
  ({"content-type":b = ""} = a.headers);
  if ((b = b.startsWith("application/json")) && a.body) {
    try {
      a.i = JSON.parse(a.body);
    } catch (k) {
      throw g = g(k), g.response = a.body, g;
    }
  }
  return a;
};
let Q;
try {
  const {version:a, name:b} = require("../package.json");
  Q = "@rqt/aqt" == b ? `@rqt/aqt/${a}` : `@rqt/aqt via ${b}/${a}`;
} catch (a) {
  Q = "@aqt/rqt";
}
const ia = M("aqt"), R = async(a, b = {}) => {
  const {data:c, type:d = "json", headers:e = {"User-Agent":`Mozilla/5.0 (Node.JS) ${Q}`}, compress:g = !0, binary:f = !1, justHeaders:l = !1, method:k, timeout:m} = b;
  b = G(!0);
  const {hostname:q, protocol:u, port:v, path:w} = N(a), n = "https:" === u ? K : L, p = {hostname:q, port:v, path:w, headers:{...e}, timeout:m, method:k};
  if (c) {
    var r = d;
    var t = c;
    switch(r) {
      case "json":
        t = JSON.stringify(t);
        r = "application/json";
        break;
      case "form":
        t = fa(t), r = "application/x-www-form-urlencoded";
    }
    t = {data:t, contentType:r};
    ({data:r} = t);
    ({contentType:t} = t);
    p.method = k || "POST";
    "Content-Type" in p.headers || (p.headers["Content-Type"] = t);
    "Content-Length" in p.headers || (p.headers["Content-Length"] = Buffer.byteLength(r));
  }
  !g || "Accept-Encoding" in p.headers || (p.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:z, headers:ja, byteLength:H, statusCode:ka, statusMessage:la, A:I, i:J} = await ha(n, p, {data:r, justHeaders:l, binary:f, g:b});
  ia("%s %s B%s", a, H, `${H != I ? ` (raw ${I} B)` : ""}`);
  return {body:J ? J : z, headers:ja, statusCode:ka, statusMessage:la};
};
const {stringify:S} = querystring;
function T(a, b, c) {
  const d = [];
  b.replace(a, (e, ...g) => {
    e = g.slice(0, g.length - 2).reduce((f, l, k) => {
      k = c[k];
      if (!k || void 0 === l) {
        return f;
      }
      f[k] = l;
      return f;
    }, {});
    d.push(e);
  });
  return d;
}
;const U = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ma = new RegExp(`\\s*((?:${U.source}\\s*)*)`);
const V = (a, b) => T(new RegExp(`<${a}${ma.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = na(c);
  return {content:d, b:c};
}), na = a => T(U, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const oa = a => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  if (void 0 === d) {
    return b;
  }
  b[c] = d;
  return b;
}, {}), pa = a => a.reduce((b, c) => b && "string" == typeof c, !0);
async function qa({l:a, j:b, m:c, host:d}, e, g = {}, f = "GET") {
  if (!e) {
    throw Error("Command must be passed.");
  }
  g = oa(g);
  b = {ApiUser:a, ApiKey:b, UserName:a, ClientIp:c, Command:e};
  a = {"User-Agent":"Mozilla/5.0 (Node.JS; @rqt/namecheap v2.3.0) https://github.com/rqt/namecheap"};
  if ("GET" == f) {
    f = S({...b, ...g}), d = await R(`${d}/xml.response?${f}`, {headers:a});
  } else {
    if ("POST" == f) {
      f = S(b), d = await R(`${d}/xml.response?${f}`, {data:g, headers:a, type:"form"});
    } else {
      throw Error("Unknown method.");
    }
  }
  d = d.body;
  if (!d.startsWith('<?xml version="1.0" encoding="utf-8"?>')) {
    throw Error("non-xml response");
  }
  if (f = ra(d)) {
    throw f;
  }
  [{content:d}] = V("CommandResponse", d);
  return d.trim();
}
const ra = a => {
  [{content:a}] = V("Errors", a);
  if (a.length) {
    var b = V("Error", a);
    if (1 == b.length) {
      const [{content:c, b:d}] = b;
      a = c;
      b = d;
    } else {
      a = b.map(({content:c}) => c).join("; "), b = b.map(({b:c}) => c);
    }
    a = new W(a);
    a.props = b;
    return a;
  }
};
class W extends Error {
}
;const sa = {name:"name", expire:"expiredate", create:"createdate"}, X = (a, b) => {
  if (!["name", "expire", "create"].includes(a.toLowerCase())) {
    throw Error(`Unknown sort by option: ${a}.`);
  }
  a = sa[a].toUpperCase();
  return b ? `${a}_DESC` : a;
};
async function ta(a, b = {}) {
  const {page:c, sort:d, desc:e, filter:g, type:f, pageSize:l} = b;
  b = {Page:c, PageSize:l, SortBy:d ? X(d, e) : X("create", "desc"), SearchTerm:g, ListType:f};
  b = await a("namecheap.domains.getList", b);
  a = V("Domain", b).map(({b:q}) => q);
  var [{content:k}] = V("Paging", b);
  [{content:b}] = V("TotalItems", k);
  const [{content:m}] = V("CurrentPage", k);
  [{content:k}] = V("PageSize", k);
  return {domains:a, TotalItems:parseInt(b, 10), CurrentPage:parseInt(m, 10), PageSize:parseInt(k, 10)};
}
;const ua = a => {
  let b, c, d;
  [{content:b}] = V("ID", a);
  try {
    [{b:d}] = V("EmailDetails", a);
  } catch (e) {
  }
  try {
    [{content:c}] = V("ExpiredDate", a);
  } catch (e) {
  }
  return {ID:parseInt(b, 10), ...c ? {ExpiredDate:c} : {}, ...d ? {EmailDetails:d} : {}};
}, va = a => {
  const [{content:b}] = V("UseAutoRenew", a), [{content:c}] = V("SubscriptionId", a), [{content:d}] = V("CreatedDate", a), [{content:e}] = V("ExpirationDate", a);
  [{content:a}] = V("IsActive", a);
  return {UseAutoRenew:"true" == b, SubscriptionId:parseInt(c, 10), CreatedDate:new Date(Date.parse(d)), ExpirationDate:new Date(Date.parse(e)), IsActive:1 == a};
}, wa = a => {
  const [{content:b, b:c}] = V("DomainGetInfoResult", a);
  var [{content:d}] = V("DomainDetails", b);
  [{content:a}] = V("CreatedDate", d);
  const [{content:e}] = V("ExpiredDate", d);
  [{content:d}] = V("NumYears", d);
  const [{content:g, b:f}] = V("Whoisguard", b), l = ua(g);
  var [{content:k}] = V("PremiumDnsSubscription", b);
  k = va(k);
  const [{content:m, b:q}] = V("DnsDetails", b), u = V("Nameserver", m).map(({content:p}) => p), [{content:v, b:w}] = V("Modificationrights", b);
  let n = {};
  v && (n = V("Rights", v).reduce((p, {b:r}) => {
    ({Type:r} = r);
    return {...p, [r]:!0};
  }, {}));
  return {...c, DomainDetails:{CreatedDate:a, ExpiredDate:e, NumYears:parseInt(d, 10)}, Whoisguard:{...f, ...l}, PremiumDnsSubscription:k, DnsDetails:{...q, Nameserver:u}, Modificationrights:{...w, ...n}};
};
async function xa(a, b) {
  const {domain:c, host:d} = "string" == typeof b ? {domain:b} : b;
  a = await a("namecheap.domains.getinfo", {DomainName:c, HostName:d});
  return wa(a);
}
;async function ya(a, b) {
  const {domains:c = [], domain:d} = "string" == typeof b ? {domain:b} : b;
  if (!Array.isArray(c)) {
    throw Error("Domains must be a list.");
  }
  if (!pa(c)) {
    throw Error("All domains must be strings.");
  }
  if (d && "string" != typeof d) {
    throw Error("Domain must be a string.");
  }
  b = [...c, ...d ? [d] : []];
  a = await a("namecheap.domains.check", {DomainList:b.join(",")});
  return V("DomainCheckResult", a).map(({b:e}) => e);
}
;async function za(a, b) {
  const {domain:c, years:d = 1, promo:e, address:g, registrantAddress:f = g, techAddress:l = g, adminAddress:k = g, billingAddress:m = g, nameservers:q = [], whois:u = !0, premium:v = {}} = b;
  b = Y(f, "Registrant");
  const w = Y(l, "Tech"), n = Y(k, "Admin"), p = Y(m, "AuxBilling");
  a = await a("namecheap.domains.create", {DomainName:c, Years:d, PromotionCode:e, ...b, ...w, ...n, ...p, Nameservers:q.join(","), AddFreeWhoisguard:u ? "yes" : "no", WGEnabled:u ? "yes" : "no", ...v}, "POST");
  [{b:a}] = V("DomainCreateResult", a);
  return a;
}
const Aa = "JobTitle FirstName LastName Address1 Address2 City StateProvince StateProvinceChoice Country Phone PhoneExt Fax EmailAddress".split(" "), Y = (a, b) => Aa.reduce((c, d) => ({...c, [`${b}${d}`]:"StateProvince" != d || a[d] ? a[d] : "NA"}), {[`${b}OrganizationName`]:a.Organization, [`${b}PostalCode`]:a.Zip});
async function Ba(a, {D:b, F:c}) {
  a = await a("namecheap.domains.dns.getHosts", {SLD:b, TLD:c});
  const [{content:d, b:e}] = V("DomainDNSGetHostsResult", a);
  a = Z(d, "Host");
  b = Z(d, "host");
  c = Z(d, "HOST");
  a = [...a, ...b, ...c];
  return {...e, hosts:a};
}
const Z = (a, b) => V(b, a).map(({b:c}) => c);
async function Ca(a, b, c) {
  b = c.reduce((d, e, g) => {
    Object.entries(e).forEach(([f, l]) => {
      ["HostName", "RecordType", "Address", "MXPref", "TTL"].includes(f) && (d[`${f}${g + 1}`] = l);
    });
    return d;
  }, b);
  a = await a("namecheap.domains.dns.setHosts", b, "POST");
  [{b:a}] = V("DomainDNSSetHostsResult", a);
  return a;
}
;async function Da(a) {
  a = await a("namecheap.users.address.getList");
  [{content:a}] = V("AddressGetListResult", a);
  return V("List", a).map(({b}) => b);
}
;const Ea = M("expensive");
async function Fa(a, b) {
  a = await a("namecheap.users.address.getInfo", {AddressId:b});
  [{content:a}] = V("GetAddressInfoResult", a);
  return Ga(a);
}
const Ha = "AddressId UserName AddressName Default_YN FirstName LastName JobTitle Organization Address1 Address2 City StateProvince StateProvinceChoice Zip Country Phone PhoneExt EmailAddress".split(" "), Ga = a => Ha.reduce((b, c) => {
  try {
    let [{content:d}] = V(c, a);
    "Default_YN" == c ? d = "true" == d : "AddressId" == c && (d = parseInt(d, 10));
    return {...b, [c]:d};
  } catch (d) {
    return Ea(`Could not extract tag ${c}`), b;
  }
}, {});
const Ja = async(a, b) => {
  const {type:c, category:d, promoCode:e, action:g, product:f} = b;
  a = await a("namecheap.users.getPricing", {ProductType:c, ProductCategory:d, PromotionCode:e, ActionName:g, ProductName:f});
  return V("ProductType", a).reduce((l, {content:k, b:{Name:m}}) => {
    k = Ia(k);
    l[m] = k;
    return l;
  }, {});
}, Ia = a => V("ProductCategory", a).reduce((b, {content:c, b:{Name:d}}) => {
  c = Ka(c);
  b[d] = c;
  return b;
}, {}), Ka = a => V("Product", a).reduce((b, {content:c, b:{Name:d}}) => {
  c = V("Price", c).map(({b:e}) => e);
  d = d.replace(/-(.)/g, (e, g) => g.toUpperCase());
  b[d] = c;
  return b;
}, {});
class La {
  constructor(a) {
    const {user:b, key:c, sandbox:d = !1, ip:e} = a;
    this.w = b;
    this.u = c;
    this.f = `https://api.${d ? "sandbox." : ""}namecheap.com`;
    this.s = e;
    const g = this.v.bind(this);
    this.users = {async getPricing(f) {
      return await Ja(g, f);
    }};
    this.domains = {async getList(f = {}) {
      return await ta(g, f);
    }, async getInfo(f) {
      return await xa(g, f);
    }, async check(f) {
      return await ya(g, f);
    }, async create(f) {
      return await za(g, f);
    }};
    this.address = {async getList() {
      return await Da(g);
    }, async getInfo(f) {
      return await Fa(g, f);
    }};
    this.dns = {async getHosts(f) {
      const [l, ...k] = f.split(".");
      return await Ba(g, {D:l, F:k.join(".")});
    }, async setHosts(f, l, k = {}) {
      const [m, ...q] = f.split(".");
      return await Ca(g, {SLD:m, TLD:q.join("."), ...k}, l);
    }};
  }
  async v(a, b, c) {
    const d = G(!0);
    try {
      return await qa({j:this.u, l:this.w, host:this.f, m:this.s}, a, b, c);
    } catch (e) {
      if (e instanceof W) {
        throw d(e);
      }
      throw e;
    }
  }
}
;module.exports = La;


//# sourceMappingURL=namecheap.js.map