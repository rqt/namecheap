/**
 * @fileoverview
 * @externs
 */

/* typal types/api/dns/index.xml externs */
/** @const */
var _namecheap = {}
/**
 * The information about the host.
 * @typedef {{ HostId: number, Name: string, Type: string, Address: string, MXPref: number, TTL: number, IsDDNSEnabled: boolean, IsActive: boolean, FriendlyName: string, AssociatedAppTitle: string }}
 */
_namecheap.Host

/* typal types/api/dns/params.xml externs */
/**
 * Parameters for the host record when setting DNS.
 * @record
 */
_namecheap.HostParams
/**
 * Sub-domain/hostname to create the record for.
 * @type {string}
 */
_namecheap.HostParams.prototype.HostName
/**
 * The type of DNS record: `A`, `AAAA`, `ALIAS`, `CAA`, `CNAME`, `MX`, `MXE`, `NS`, `TXT`, `URL`, `URL301`, `FRAME`.
 * @type {string}
 */
_namecheap.HostParams.prototype.RecordType
/**
 * The IP or URL information.
 * @type {string}
 */
_namecheap.HostParams.prototype.Address
/**
 * MX preference for host. Applicable for MX records only.
 * @type {string|undefined}
 */
_namecheap.HostParams.prototype.MXPref
/**
 * Time to live for all record types. Default `1800`.
 * @type {number|undefined}
 */
_namecheap.HostParams.prototype.TTL
/**
 * Additional options to set DNS records.
 * @record
 */
_namecheap.DNSSetOptions
/**
 * Possible values are `MXE`, `MX`, `FWD`, `OX`.
 * @type {string|undefined}
 */
_namecheap.DNSSetOptions.prototype.EmailType
/**
 * Is an unsigned integer between 0 and 255. The flag value is an 8-bit number, the most significant bit of which indicates the criticality of understanding of a record by a CA. It's recommended to use '0'.
 * @type {number|undefined}
 */
_namecheap.DNSSetOptions.prototype.Flag
/**
 * A non-zero sequence of US-ASCII letters and numbers in lower case. See namecheap API page for more info.
 * @type {string|undefined}
 */
_namecheap.DNSSetOptions.prototype.Tag
