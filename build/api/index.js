let getList = require('./domains/get-list'); if (getList && getList.__esModule) getList = getList.default;
let getInfo = require('./domains/get-info'); if (getInfo && getInfo.__esModule) getInfo = getInfo.default;
let check = require('./domains/check'); if (check && check.__esModule) check = check.default;
let create = require('./domains/create'); if (create && create.__esModule) create = create.default;

let getAddressList = require('./users/address/get-list'); if (getAddressList && getAddressList.__esModule) getAddressList = getAddressList.default;
let getAddressInfo = require('./users/address/get-info'); if (getAddressInfo && getAddressInfo.__esModule) getAddressInfo = getAddressInfo.default;

const domains = {
  getList,
  getInfo,
  check,
  create,
}

const api = {
  domains,
  users: {
    address: {
      getList: getAddressList,
      getInfo: getAddressInfo,
    },
  },
}

module.exports=api