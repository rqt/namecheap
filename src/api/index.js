import getList from './domains/get-list'
import getInfo from './domains/get-info'
import check from './domains/check'
import create from './domains/create'

import getAddressList from './users/address/get-list'
import getAddressInfo from './users/address/get-info'

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

export default api