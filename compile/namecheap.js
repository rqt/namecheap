#!/usr/bin/env node
             
const querystring = require('querystring');
const https = require('https');
const http = require('http');
const util = require('util');
const url = require('url');
const os = require('os');
const zlib = require('zlib');
const stream = require('stream');             
const {request:h} = https;
const {request:x} = http;
const {debuglog:y} = util;
const A = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, B = (a, b = !1) => A(a, 2 + (b ? 1 : 0)), C = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:D} = os;
const E = /\s+at.*(?:\(|\s)(.*)\)?/, F = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, G = D(), K = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = new RegExp(F.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(e => {
    e = e.match(E);
    if (null === e || !e[1]) {
      return !0;
    }
    e = e[1];
    return e.includes(".app/Contents/Resources/electron.asar") || e.includes(".app/Contents/Resources/default_app.asar") ? !1 : !d.test(e);
  }).filter(e => e.trim()).map(e => b ? e.replace(E, (g, f) => g.replace(f, f.replace(G, "~"))) : e).join("\n");
};
function L(a, b, c = !1) {
  return function(d) {
    var e = C(arguments), {stack:g} = Error();
    const f = A(g, 2, !0), l = (g = d instanceof Error) ? d.message : d;
    e = [`Error: ${l}`, ...null !== e && a === e || c ? [b] : [f, b]].join("\n");
    e = K(e);
    return Object.assign(g ? d : Error(), {message:l, stack:e});
  };
}
;function M(a) {
  var {stack:b} = Error();
  const c = C(arguments);
  b = B(b, a);
  return L(c, b, a);
}
;const {parse:N} = url;
const {Writable:O} = stream;
const P = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Q extends O {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {g:e = M(!0), proxyError:g} = a || {}, f = (l, k) => e(k);
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
          const q = K(m.stack);
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
const aa = async(a, b = {}) => {
  ({h:a} = new Q({rs:a, ...b, g:M(!0)}));
  return await a;
};
const {createGunzip:ba} = zlib;
const ca = a => {
  ({"content-encoding":a} = a.headers);
  return "gzip" == a;
}, da = (a, b, c = {}) => {
  const {justHeaders:d, binary:e, g = M(!0)} = c;
  let f, l, k, m, q = 0, u = 0;
  c = (new Promise((v, w) => {
    f = a(b, async n => {
      ({headers:l} = n);
      const {statusMessage:p, statusCode:r} = n;
      k = {statusMessage:p, statusCode:r};
      if (d) {
        n.destroy();
      } else {
        var t = ca(n);
        n.on("data", z => q += z.byteLength);
        n = t ? n.pipe(ba()) : n;
        m = await aa(n, {binary:e});
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
const ea = (a = {}) => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(d)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), fa = async(a, b, {data:c, justHeaders:d, binary:e, g = M(!0)}) => {
  const {B:f, h:l} = da(a, b, {justHeaders:d, binary:e, g});
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
let R;
try {
  const {version:a, name:b} = require("../package.json");
  R = "@rqt/aqt" == b ? `@rqt/aqt/${a}` : `@rqt/aqt via ${b}/${a}`;
} catch (a) {
  R = "@aqt/rqt";
}
const ha = y("aqt"), S = async(a, b = {}) => {
  const {data:c, type:d = "json", headers:e = {"User-Agent":`Mozilla/5.0 (Node.JS) ${R}`}, compress:g = !0, binary:f = !1, justHeaders:l = !1, method:k, timeout:m} = b;
  b = M(!0);
  const {hostname:q, protocol:u, port:v, path:w} = N(a), n = "https:" === u ? h : x, p = {hostname:q, port:v, path:w, headers:{...e}, timeout:m, method:k};
  if (c) {
    var r = d;
    var t = c;
    switch(r) {
      case "json":
        t = JSON.stringify(t);
        r = "application/json";
        break;
      case "form":
        t = ea(t), r = "application/x-www-form-urlencoded";
    }
    t = {data:t, contentType:r};
    ({data:r} = t);
    ({contentType:t} = t);
    p.method = k || "POST";
    "Content-Type" in p.headers || (p.headers["Content-Type"] = t);
    "Content-Length" in p.headers || (p.headers["Content-Length"] = Buffer.byteLength(r));
  }
  !g || "Accept-Encoding" in p.headers || (p.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:z, headers:ia, byteLength:H, statusCode:ja, statusMessage:ka, A:I, i:J} = await fa(n, p, {data:r, justHeaders:l, binary:f, g:b});
  ha("%s %s B%s", a, H, `${H != I ? ` (raw ${I} B)` : ""}`);
  return {body:J ? J : z, headers:ia, statusCode:ja, statusMessage:ka};
};
const {stringify:T} = querystring;
function U(a, b, c) {
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
;const V = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), la = new RegExp(`\\s*((?:${V.source}\\s*)*)`);
const W = (a, b) => U(new RegExp(`<${a}${la.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = ma(c);
  return {content:d, b:c};
}), ma = a => U(V, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const na = a => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  if (void 0 === d) {
    return b;
  }
  b[c] = d;
  return b;
}, {}), oa = a => a.reduce((b, c) => b && "string" == typeof c, !0);
async function pa({l:a, j:b, m:c, host:d}, e, g = {}, f = "GET") {
  if (!e) {
    throw Error("Command must be passed.");
  }
  g = na(g);
  b = {ApiUser:a, ApiKey:b, UserName:a, ClientIp:c, Command:e};
  a = {"User-Agent":"Mozilla/5.0 (Node.JS; @rqt/namecheap v2.3.0) https://github.com/rqt/namecheap"};
  if ("GET" == f) {
    f = T({...b, ...g}), d = await S(`${d}/xml.response?${f}`, {headers:a});
  } else {
    if ("POST" == f) {
      f = T(b), d = await S(`${d}/xml.response?${f}`, {data:g, headers:a, type:"form"});
    } else {
      throw Error("Unknown method.");
    }
  }
  d = d.body;
  if (!d.startsWith('<?xml version="1.0" encoding="utf-8"?>')) {
    throw Error("non-xml response");
  }
  if (f = qa(d)) {
    throw f;
  }
  [{content:d}] = W("CommandResponse", d);
  return d.trim();
}
const qa = a => {
  [{content:a}] = W("Errors", a);
  if (a.length) {
    var b = W("Error", a);
    if (1 == b.length) {
      const [{content:c, b:d}] = b;
      a = c;
      b = d;
    } else {
      a = b.map(({content:c}) => c).join("; "), b = b.map(({b:c}) => c);
    }
    a = Error(a);
    a.props = b;
    return a;
  }
};
const ra = {name:"name", expire:"expiredate", create:"createdate"}, X = (a, b) => {
  if (!["name", "expire", "create"].includes(a.toLowerCase())) {
    throw Error(`Unknown sort by option: ${a}.`);
  }
  a = ra[a].toUpperCase();
  return b ? `${a}_DESC` : a;
};
async function sa(a, b = {}) {
  const {page:c, sort:d, desc:e, filter:g, type:f, pageSize:l} = b;
  b = {Page:c, PageSize:l, SortBy:d ? X(d, e) : X("create", "desc"), SearchTerm:g, ListType:f};
  b = await a("namecheap.domains.getList", b);
  a = W("Domain", b).map(({b:q}) => q);
  var [{content:k}] = W("Paging", b);
  [{content:b}] = W("TotalItems", k);
  const [{content:m}] = W("CurrentPage", k);
  [{content:k}] = W("PageSize", k);
  return {domains:a, TotalItems:parseInt(b, 10), CurrentPage:parseInt(m, 10), PageSize:parseInt(k, 10)};
}
;const ta = a => {
  let b, c, d;
  [{content:b}] = W("ID", a);
  try {
    [{b:d}] = W("EmailDetails", a);
  } catch (e) {
  }
  try {
    [{content:c}] = W("ExpiredDate", a);
  } catch (e) {
  }
  return {ID:parseInt(b, 10), ...c ? {ExpiredDate:c} : {}, ...d ? {EmailDetails:d} : {}};
}, ua = a => {
  const [{content:b}] = W("UseAutoRenew", a), [{content:c}] = W("SubscriptionId", a), [{content:d}] = W("CreatedDate", a), [{content:e}] = W("ExpirationDate", a);
  [{content:a}] = W("IsActive", a);
  return {UseAutoRenew:"true" == b, SubscriptionId:parseInt(c, 10), CreatedDate:new Date(Date.parse(d)), ExpirationDate:new Date(Date.parse(e)), IsActive:1 == a};
}, va = a => {
  const [{content:b, b:c}] = W("DomainGetInfoResult", a);
  var [{content:d}] = W("DomainDetails", b);
  [{content:a}] = W("CreatedDate", d);
  const [{content:e}] = W("ExpiredDate", d);
  [{content:d}] = W("NumYears", d);
  const [{content:g, b:f}] = W("Whoisguard", b), l = ta(g);
  var [{content:k}] = W("PremiumDnsSubscription", b);
  k = ua(k);
  const [{content:m, b:q}] = W("DnsDetails", b), u = W("Nameserver", m).map(({content:p}) => p), [{content:v, b:w}] = W("Modificationrights", b);
  let n = {};
  v && (n = W("Rights", v).reduce((p, {b:r}) => {
    ({Type:r} = r);
    return {...p, [r]:!0};
  }, {}));
  return {...c, DomainDetails:{CreatedDate:a, ExpiredDate:e, NumYears:parseInt(d, 10)}, Whoisguard:{...f, ...l}, PremiumDnsSubscription:k, DnsDetails:{...q, Nameserver:u}, G:{...w, ...n}};
};
async function wa(a, b) {
  const {domain:c, host:d} = "string" == typeof b ? {domain:b} : b;
  a = await a("namecheap.domains.getinfo", {DomainName:c, HostName:d});
  return va(a);
}
;async function xa(a, b) {
  const {domains:c = [], domain:d} = "string" == typeof b ? {domain:b} : b;
  if (!Array.isArray(c)) {
    throw Error("Domains must be a list.");
  }
  if (!oa(c)) {
    throw Error("All domains must be strings.");
  }
  if (d && "string" != typeof d) {
    throw Error("Domain must be a string.");
  }
  b = [...c, ...d ? [d] : []];
  a = await a("namecheap.domains.check", {DomainList:b.join(",")});
  return W("DomainCheckResult", a).map(({b:e}) => e);
}
;async function ya(a, b) {
  const {domain:c, years:d = 1, promo:e, address:g, registrantAddress:f = g, techAddress:l = g, adminAddress:k = g, billingAddress:m = g, nameservers:q = [], whois:u = !0, premium:v = {}} = b;
  b = Y(f, "Registrant");
  const w = Y(l, "Tech"), n = Y(k, "Admin"), p = Y(m, "AuxBilling");
  a = await a("namecheap.domains.create", {DomainName:c, Years:d, PromotionCode:e, ...b, ...w, ...n, ...p, Nameservers:q.join(","), AddFreeWhoisguard:u ? "yes" : "no", WGEnabled:u ? "yes" : "no", ...v}, "POST");
  [{b:a}] = W("DomainCreateResult", a);
  return a;
}
const za = "JobTitle FirstName LastName Address1 Address2 City StateProvince StateProvinceChoice Country Phone PhoneExt Fax EmailAddress".split(" "), Y = (a, b) => za.reduce((c, d) => ({...c, [`${b}${d}`]:"StateProvince" != d || a[d] ? a[d] : "NA"}), {[`${b}OrganizationName`]:a.Organization, [`${b}PostalCode`]:a.Zip});
async function Aa(a, {D:b, F:c}) {
  a = await a("namecheap.domains.dns.getHosts", {SLD:b, TLD:c});
  const [{content:d, b:e}] = W("DomainDNSGetHostsResult", a);
  a = Z(d, "Host");
  b = Z(d, "host");
  c = Z(d, "HOST");
  a = [...a, ...b, ...c];
  return {...e, hosts:a};
}
const Z = (a, b) => W(b, a).map(({b:c}) => c);
async function Ba(a, b, c) {
  b = c.reduce((d, e, g) => {
    Object.entries(e).forEach(([f, l]) => {
      ["HostName", "RecordType", "Address", "MXPref", "TTL"].includes(f) && (d[`${f}${g + 1}`] = l);
    });
    return d;
  }, b);
  a = await a("namecheap.domains.dns.setHosts", b, "POST");
  [{b:a}] = W("DomainDNSSetHostsResult", a);
  return a;
}
;async function Ca(a) {
  a = await a("namecheap.users.address.getList");
  [{content:a}] = W("AddressGetListResult", a);
  return W("List", a).map(({b}) => b);
}
;const Da = y("expensive");
async function Ea(a, b) {
  a = await a("namecheap.users.address.getInfo", {AddressId:b});
  [{content:a}] = W("GetAddressInfoResult", a);
  return Fa(a);
}
const Ga = "AddressId UserName AddressName Default_YN FirstName LastName JobTitle Organization Address1 Address2 City StateProvince StateProvinceChoice Zip Country Phone PhoneExt EmailAddress".split(" "), Fa = a => Ga.reduce((b, c) => {
  try {
    let [{content:d}] = W(c, a);
    "Default_YN" == c ? d = "true" == d : "AddressId" == c && (d = parseInt(d, 10));
    return {...b, [c]:d};
  } catch (d) {
    return Da(`Could not extract tag ${c}`), b;
  }
}, {});
const Ia = async(a, b) => {
  const {type:c, category:d, promoCode:e, action:g, product:f} = b;
  a = await a("namecheap.users.getPricing", {ProductType:c, ProductCategory:d, PromotionCode:e, ActionName:g, ProductName:f});
  return W("ProductType", a).reduce((l, {content:k, b:{Name:m}}) => {
    k = Ha(k);
    l[m] = k;
    return l;
  }, {});
}, Ha = a => W("ProductCategory", a).reduce((b, {content:c, b:{Name:d}}) => {
  c = Ja(c);
  b[d] = c;
  return b;
}, {}), Ja = a => W("Product", a).reduce((b, {content:c, b:{Name:d}}) => {
  c = W("Price", c).map(({b:e}) => e);
  d = d.replace(/-(.)/g, (e, g) => g.toUpperCase());
  b[d] = c;
  return b;
}, {});
class Ka {
  constructor(a) {
    const {user:b, key:c, sandbox:d = !1, ip:e} = a;
    this.w = b;
    this.u = c;
    this.f = `https://api.${d ? "sandbox." : ""}namecheap.com`;
    this.s = e;
    const g = this.v.bind(this);
    this.users = {async getPricing(f) {
      return await Ia(g, f);
    }};
    this.domains = {async getList(f = {}) {
      return await sa(g, f);
    }, async getInfo(f) {
      return await wa(g, f);
    }, async check(f) {
      return await xa(g, f);
    }, async create(f) {
      return await ya(g, f);
    }};
    this.address = {async getList() {
      return await Ca(g);
    }, async getInfo(f) {
      return await Ea(g, f);
    }};
    this.dns = {async getHosts(f) {
      const [l, ...k] = f.split(".");
      return await Aa(g, {D:l, F:k.join(".")});
    }, async setHosts(f, l, k = {}) {
      const [m, ...q] = f.split(".");
      return await Ba(g, {SLD:m, TLD:q.join("."), ...k}, l);
    }};
  }
  async v(a, b, c) {
    try {
      return await pa({j:this.u, l:this.w, host:this.f, m:this.s}, a, b, c);
    } catch (d) {
      throw d;
    }
  }
}
;module.exports = Ka;


//# sourceMappingURL=namecheap.js.map