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

export const get_all_cases = data => {
  return get ({
    url: '/cases/get_all_cases',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const change_cname = data => {
  return post2 ({
    url: '/cases/change_cname',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const change_photo1 = data => {
  return post ({
    url: '/cases/change_photo1',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const change_photo2 = data => {
  return post ({
    url: '/cases/change_photo2',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const change_type = data => {
  return post ({
    url: '/cases/change_type',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const change_video4 = data => {
  return post ({
    url: '/cases/change_video4',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const change_word1 = data => {
  return post2 ({
    url: '/cases/change_word1',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const change_word2 = data => {
  return post2 ({
    url: '/cases/change_word2',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const change_word3 = data => {
  return post2 ({
    url: '/cases/change_word3',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const change_word4 = data => {
  return post2 ({
    url: '/cases/change_word4',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const delete_case = data => {
  return post ({
    url: '/cases/delete_case',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const insert_case = data => {
  return post ({
    url: '/cases/insert_case',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}