import {post, get, post2,post3,post4,post5,post6} from '@/util/service'

export const login = data => {
  return get ({
    url: '/users/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const getAllCases = data => {
  return get ({
    url: '/cases/get_all_cases',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const changeCname = data => {
  return get ({
    url: '/cases/change_cname',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const changePhoto1 = data => {
  return get ({
    url: '/cases/change_photo1',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const changePhoto2 = data => {
  return get ({
    url: '/cases/change_photo2',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const changeType = data => {
  return get ({
    url: '/cases/change_type',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const changeVideo4 = data => {
  return get ({
    url: '/cases/change_video4',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const changeWord1 = data => {
  return get ({
    url: '/cases/change_word1',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const changeWord2 = data => {
  return get ({
    url: '/cases/change_word2',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const changeWord3 = data => {
  return get ({
    url: '/cases/change_word3',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const changeWord4 = data => {
  return get ({
    url: '/cases/change_word4',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const deleteCase = data => {
  return get ({
    url: '/cases/delete_case',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const insertCase = data => {
  return get ({
    url: '/cases/insert_case',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}