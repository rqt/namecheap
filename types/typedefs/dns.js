export {}
/* typal types/api/dns/index.xml noSuppress */
/**
 * @typedef {_namecheap.Host} Host The information about the host.
 */
/**
 * @typedef {Object} _namecheap.Host The information about the host.
 * @prop {number} HostId UniqueID of the host records, e.g., `151362331`.
 * @prop {string} Name The domain or subdomain for which host record is set, e.g., `*`, `@`.
 * @prop {string} Type The type of host record that is set, e.g., `A`.
 * @prop {string} Address The value that is set for the host record (IP address for A record, URL for URL redirects, etc.), e.g., `10.28.121.54`.
 * @prop {number} MXPref MXPreference number, e.g., `10`.
 * @prop {number} TTL TTL value for the host record, e.g., `1799`.
 * @prop {boolean} IsDDNSEnabled false
 * @prop {boolean} IsActive true
 * @prop {string} FriendlyName ""
 * @prop {string} AssociatedAppTitle ""
 */
