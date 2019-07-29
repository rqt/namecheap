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
const E = /\s+at.*(?:\(|\s)(.*)\)?/, I = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, J = D(), K = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = new RegExp(I.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(e => {
    e = e.match(E);
    if (null === e || !e[1]) {
      return !0;
    }
    e = e[1];
    return e.includes(".app/Contents/Resources/electron.asar") || e.includes(".app/Contents/Resources/default_app.asar") ? !1 : !d.test(e);
  }).filter(e => e.trim()).map(e => b ? e.replace(E, (f, g) => f.replace(g, g.replace(J, "~"))) : e).join("\n");
};
function L(a, b, c = !1) {
  return function(d) {
    var e = C(arguments), {stack:f} = Error();
    const g = A(f, 2, !0), l = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${l}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = K(e);
    return Object.assign(f ? d : Error(), {message:l, stack:e});
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
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {g:f = M(!0), proxyError:g} = a || {}, l = (k, q) => f(q);
    super(b);
    this.f = [];
    this.o = new Promise((k, q) => {
      this.on("finish", () => {
        let m;
        d ? m = Buffer.concat(this.f) : m = this.f.join("");
        k(m);
        this.f = [];
      });
      this.once("error", m => {
        if (-1 == m.stack.indexOf("\n")) {
          l`${m}`;
        } else {
          const u = K(m.stack);
          m.stack = u;
          g && l`${m}`;
        }
        q(m);
      });
      e && P(this, e).pipe(this);
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
const R = async(a, b) => {
  b = void 0 === b ? {} : b;
  ({h:a} = new Q(Object.assign({}, {rs:a}, b, {g:M(!0)})));
  return await a;
};
const {createGunzip:aa} = zlib;
const ba = a => {
  ({"content-encoding":a} = a.headers);
  return "gzip" == a;
}, ca = (a, b, c) => {
  c = void 0 === c ? {} : c;
  const {justHeaders:d, binary:e, g:f = M(!0)} = c;
  let g, l, k, q, m = 0, u = 0;
  c = (new Promise((v, w) => {
    g = a(b, async n => {
      ({headers:l} = n);
      const {statusMessage:p, statusCode:r} = n;
      k = {statusMessage:p, statusCode:r};
      if (d) {
        n.destroy();
      } else {
        var t = ba(n);
        n.on("data", z => m += z.byteLength);
        n = t ? n.pipe(aa()) : n;
        q = await R(n, {binary:e});
        u = q.length;
      }
      v();
    }).on("error", n => {
      n = f(n);
      w(n);
    }).on("timeout", () => {
      g.abort();
    });
  })).then(() => Object.assign({}, {body:q, headers:l}, k, {A:m, byteLength:u, i:null}));
  return {B:g, h:c};
};
const da = (a = {}) => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(d)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), ea = async(a, b, {data:c, justHeaders:d, binary:e, g:f = M(!0)}) => {
  const {B:g, h:l} = ca(a, b, {justHeaders:d, binary:e, g:f});
  g.end(c);
  a = await l;
  ({"content-type":b = ""} = a.headers);
  if ((b = b.startsWith("application/json")) && a.body) {
    try {
      a.i = JSON.parse(a.body);
    } catch (k) {
      throw f = f(k), f.response = a.body, f;
    }
  }
  return a;
};
let S;
try {
  const {version:a, name:b} = require("../package.json");
  S = "@rqt/aqt" == b ? `@rqt/aqt/${a}` : `@rqt/aqt via ${b}/${a}`;
} catch (a) {
  S = "@aqt/rqt";
}
const fa = y("aqt"), T = async(a, b) => {
  b = void 0 === b ? {} : b;
  const {data:c, type:d = "json", headers:e = {"User-Agent":`Mozilla/5.0 (Node.JS) ${S}`}, compress:f = !0, binary:g = !1, justHeaders:l = !1, method:k, timeout:q} = b;
  b = M(!0);
  const {hostname:m, protocol:u, port:v, path:w} = N(a), n = "https:" === u ? h : x, p = {hostname:m, port:v, path:w, headers:Object.assign({}, e), timeout:q, method:k};
  if (c) {
    var r = d;
    var t = c;
    switch(r) {
      case "json":
        t = JSON.stringify(t);
        r = "application/json";
        break;
      case "form":
        t = da(t), r = "application/x-www-form-urlencoded";
    }
    t = {data:t, contentType:r};
    ({data:r} = t);
    ({contentType:t} = t);
    p.method = k || "POST";
    "Content-Type" in p.headers || (p.headers["Content-Type"] = t);
    "Content-Length" in p.headers || (p.headers["Content-Length"] = Buffer.byteLength(r));
  }
  !f || "Accept-Encoding" in p.headers || (p.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:z, headers:ha, byteLength:F, statusCode:ia, statusMessage:ja, A:G, i:H} = await ea(n, p, {data:r, justHeaders:l, binary:g, g:b});
  fa("%s %s B%s", a, F, `${F != G ? ` (raw ${G} B)` : ""}`);
  return {body:H ? H : z, headers:ha, statusCode:ia, statusMessage:ja};
};
const {stringify:U} = querystring;
function V(a, b, c) {
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, l, k) => {
      k = c[k];
      if (!k || void 0 === l) {
        return g;
      }
      g[k] = l;
      return g;
    }, {});
    d.push(e);
  });
  return d;
}
;const W = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ka = new RegExp(`\\s*((?:${W.source}\\s*)*)`);
const X = (a, b) => V(new RegExp(`<${a}${ka.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = la(c);
  return {content:d, b:c};
}), la = a => V(W, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const ma = a => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  if (void 0 === d) {
    return b;
  }
  b[c] = d;
  return b;
}, {}), na = a => a.reduce((b, c) => b && "string" == typeof c, !0);
async function oa(a, b, c, d) {
  var {l:e, j:f, m:g, host:l} = a;
  c = void 0 === c ? {} : c;
  d = void 0 === d ? "GET" : d;
  if (!b) {
    throw Error("Command must be passed.");
  }
  a = ma(c);
  c = {l:e, j:f, H:e, m:g, D:b};
  b = {"User-Agent":"Mozilla/5.0 (Node.js; @rqt/namecheap v2.1.2) https://github.com/rqt/namecheap"};
  if ("GET" == d) {
    d = U(Object.assign({}, c, a)), d = await T(`${l}/xml.response?${d}`, {headers:b});
  } else {
    if ("POST" == d) {
      d = U(c), d = await T(`${l}/xml.response?${d}`, {data:a, headers:b, type:"form"});
    } else {
      throw Error("Unknown method.");
    }
  }
  d = d.body;
  if (!d.startsWith('<?xml version="1.0" encoding="utf-8"?>')) {
    throw Error("non-xml response");
  }
  if (a = pa(d)) {
    throw a;
  }
  [{content:d}] = X("CommandResponse", d);
  return d.trim();
}
const pa = a => {
  [{content:a}] = X("Errors", a);
  if (a.length) {
    var b = X("Error", a);
    if (1 == b.length) {
      const [{content:c, b:d}] = b;
      a = c;
      b = d;
    } else {
      a = b.map(c => {
        ({content:c} = c);
        return c;
      }).join("; "), b = b.map(c => {
        ({b:c} = c);
        return c;
      });
    }
    a = Error(a);
    a.b = b;
    return a;
  }
};
const qa = {name:"name", I:"expiredate", create:"createdate"}, Y = (a, b) => {
  if (!["name", "expire", "create"].includes(a.toLowerCase())) {
    throw Error(`Unknown sort by option: ${a}.`);
  }
  a = qa[a].toUpperCase();
  return b ? `${a}_DESC` : a;
};
async function ra(a, b = {}) {
  const {page:c, sort:d, desc:e, filter:f, type:g, pageSize:l} = b;
  b = {Page:c, PageSize:l, SortBy:d ? Y(d, e) : Y("create", "desc"), SearchTerm:f, ListType:g};
  b = await a("namecheap.domains.getList", b);
  a = X("Domain", b).map(({b:m}) => m);
  var [{content:k}] = X("Paging", b);
  [{content:b}] = X("TotalItems", k);
  const [{content:q}] = X("CurrentPage", k);
  [{content:k}] = X("PageSize", k);
  return {domains:a, TotalItems:parseInt(b, 10), CurrentPage:parseInt(q, 10), PageSize:parseInt(k, 10)};
}
;const sa = a => {
  let b, c, d;
  [{content:b}] = X("ID", a);
  try {
    [{b:d}] = X("EmailDetails", a);
  } catch (e) {
  }
  try {
    [{content:c}] = X("ExpiredDate", a);
  } catch (e) {
  }
  return Object.assign({}, {ID:parseInt(b, 10)}, c ? {ExpiredDate:c} : {}, d ? {EmailDetails:d} : {});
}, ta = a => {
  const [{content:b}] = X("UseAutoRenew", a), [{content:c}] = X("SubscriptionId", a), [{content:d}] = X("CreatedDate", a), [{content:e}] = X("ExpirationDate", a);
  [{content:a}] = X("IsActive", a);
  return {UseAutoRenew:"true" == b, SubscriptionId:parseInt(c, 10), CreatedDate:new Date(Date.parse(d)), ExpirationDate:new Date(Date.parse(e)), IsActive:1 == a};
}, ua = a => {
  const [{content:b, b:c}] = X("DomainGetInfoResult", a);
  var [{content:d}] = X("DomainDetails", b);
  [{content:a}] = X("CreatedDate", d);
  const [{content:e}] = X("ExpiredDate", d);
  [{content:d}] = X("NumYears", d);
  const [{content:f, b:g}] = X("Whoisguard", b), l = sa(f);
  var [{content:k}] = X("PremiumDnsSubscription", b);
  k = ta(k);
  const [{content:q, b:m}] = X("DnsDetails", b), u = X("Nameserver", q).map(p => {
    ({content:p} = p);
    return p;
  }), [{content:v, b:w}] = X("Modificationrights", b);
  let n = {};
  v && (n = X("Rights", v).reduce((p, r) => {
    ({b:r} = r);
    ({G:r} = r);
    return Object.assign({}, p, {[r]:!0});
  }, {}));
  return Object.assign({}, c, {DomainDetails:{CreatedDate:a, ExpiredDate:e, NumYears:parseInt(d, 10)}, Whoisguard:Object.assign({}, g, l), PremiumDnsSubscription:k, DnsDetails:Object.assign({}, m, {Nameserver:u}), F:Object.assign({}, w, n)});
};
async function va(a, b) {
  const {domain:c, host:d} = "string" == typeof b ? {domain:b} : b;
  a = await a("namecheap.domains.getinfo", {DomainName:c, HostName:d});
  return ua(a);
}
;async function wa(a, b) {
  const {domains:c = [], domain:d} = "string" == typeof b ? {domain:b} : b;
  if (!Array.isArray(c)) {
    throw Error("Domains must be a list.");
  }
  if (!na(c)) {
    throw Error("All domains must be strings.");
  }
  if (d && "string" != typeof d) {
    throw Error("Domain must be a string.");
  }
  b = [...c, ...d ? [d] : []];
  a = await a("namecheap.domains.check", {DomainList:b.join(",")});
  return X("DomainCheckResult", a).map(({b:e}) => e);
}
;async function xa(a, b) {
  const {domain:c, years:d = 1, promo:e, address:f, registrantAddress:g = f, techAddress:l = f, adminAddress:k = f, billingAddress:q = f, nameservers:m = [], whois:u = !0, premium:v = {}} = b;
  b = Z(g, "Registrant");
  const w = Z(l, "Tech"), n = Z(k, "Admin"), p = Z(q, "AuxBilling");
  a = await a("namecheap.domains.create", Object.assign({}, {DomainName:c, Years:d, PromotionCode:e}, b, w, n, p, {Nameservers:m.join(","), AddFreeWhoisguard:u ? "yes" : "no", WGEnabled:u ? "yes" : "no"}, v), "POST");
  [{b:a}] = X("DomainCreateResult", a);
  return a;
}
const ya = "JobTitle FirstName LastName Address1 Address2 City StateProvince StateProvinceChoice Country Phone PhoneExt Fax EmailAddress".split(" "), Z = (a, b) => ya.reduce((c, d) => Object.assign({}, c, {[`${b}${d}`]:"StateProvince" != d || a[d] ? a[d] : "NA"}), {[`${b}OrganizationName`]:a.Organization, [`${b}PostalCode`]:a.Zip});
const Aa = async(a, b) => {
  const {type:c, category:d, promoCode:e, action:f, product:g} = b;
  a = await a("namecheap.users.getPricing", {ProductType:c, ProductCategory:d, PromotionCode:e, ActionName:f, ProductName:g});
  return X("ProductType", a).reduce((l, {content:k, b:{Name:q}}) => {
    k = za(k);
    l[q] = k;
    return l;
  }, {});
}, za = a => X("ProductCategory", a).reduce((b, {content:c, b:{Name:d}}) => {
  c = Ba(c);
  b[d] = c;
  return b;
}, {}), Ba = a => X("Product", a).reduce((b, {content:c, b:{Name:d}}) => {
  c = X("Price", c).map(({b:e}) => e);
  d = d.replace(/-(.)/g, (e, f) => f.toUpperCase());
  b[d] = c;
  return b;
}, {});
class Ca {
  constructor(a) {
    const {user:b, key:c, sandbox:d = !1, ip:e} = a;
    this.w = b;
    this.u = c;
    this.f = `https://api.${d ? "sandbox." : ""}namecheap.com`;
    this.s = e;
    const f = this.v.bind(this);
    this.users = {async getPricing(g) {
      return await Aa(f, g);
    }};
    this.domains = {async getList(g = {}) {
      return await ra(f, g);
    }, async getInfo(g) {
      return await va(f, g);
    }, async check(g) {
      return await wa(f, g);
    }, async create(g) {
      return await xa(f, g);
    }};
  }
  async v(a, b, c) {
    try {
      return await oa({ApiKey:this.u, ApiUser:this.w, host:this.f, ClientIp:this.s}, a, b, c);
    } catch (d) {
      throw d;
    }
  }
}
;module.exports = Ca;


//# sourceMappingURL=namecheap.js.map