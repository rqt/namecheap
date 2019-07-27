export {}
/* typal types/api/dns/index.xml noSuppress */
/**
 * @typedef {_namecheap.Host} Host The information about the host.
 */
/**
 * @typedef {Object} _namecheap.Host The information about the host.
 * @prop {number} HostId UniqueID of the host records, e.g., `151362331`.
 * @prop {string} Name The domain or subdomain for which host record is set, e.g., `*`, `＠`.
 * @prop {string} Type The type of host record that is set, e.g., `A`.
 * @prop {string} Address The value that is set for the host record (IP address for A record, URL for URL redirects, etc.), e.g., `10.28.121.54`.
 * @prop {number} MXPref MXPreference number, e.g., `10`.
 * @prop {number} TTL TTL value for the host record, e.g., `1799`.
 * @prop {boolean} IsDDNSEnabled false
 * @prop {boolean} IsActive true
 * @prop {string} FriendlyName ""
 * @prop {string} AssociatedAppTitle ""
 */

/* typal types/api/dns/params.xml noSuppress */
/**
 * @typedef {_namecheap.HostParams} HostParams `＠record` Parameters for the host record when setting DNS.
 */
/**
 * @typedef {Object} _namecheap.HostParams `＠record` Parameters for the host record when setting DNS.
 * @prop {string} HostName Sub-domain/hostname to create the record for.
 * @prop {string} RecordType The type of DNS record: `A`, `AAAA`, `ALIAS`, `CAA`, `CNAME`, `MX`, `MXE`, `NS`, `TXT`, `URL`, `URL301`, `FRAME`.
 * @prop {string} Address The IP or URL information.
 * @prop {string} [MXPref] MX preference for host. Applicable for MX records only.
 * @prop {number} [TTL=1800] Time to live for all record types. Default `1800`.
 */
/**
 * @typedef {_namecheap.DNSSetOptions} DNSSetOptions `＠record` Additional options to set DNS records.
 */
/**
 * @typedef {Object} _namecheap.DNSSetOptions `＠record` Additional options to set DNS records.
 * @prop {string} EmailType Possible values are MXE, MX, FWD, OX.
 * @prop {number} Flag Is an unsigned integer between 0 and 255. The flag value is an 8-bit number, the most significant bit of which indicates the criticality of understanding of a record by a CA. It's recommended to use '0'.
 * @prop {string} Tag A non-zero sequence of US-ASCII letters and numbers in lower case. See namecheap API page for more info.
 */
