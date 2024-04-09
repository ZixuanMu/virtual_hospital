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
export const fetchUserData = data => {
  return get({
    url: '/users/get_user',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  });
};
export const changeUserInformation = (userData) => {
  return post({
    url: '/users/change_information',
    headers: {
      'Content-Type': 'application/json'
    },
    data: userData
  });
};
export const get_all_cases = data => {
  return get ({
    url: '/cases/get_all_cases',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const change_cname = (cid,cname) => {
  return post ({
    url: '/cases/change_cname?cid='+cid+'&cname='+cname,
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

export const change_type = (cid,type) => {
  return post ({
    url: '/cases/change_type?cid='+cid+'&type='+type,
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
export const change_word1 = (cid,word1) => {
  return post ({
    url: '/cases/change_word1?cid='+cid+'&word1='+word1,
  })
}
export const change_word2 = (cid,word2) => {
  return post ({
    url: '/cases/change_word2?cid='+cid+'&word2='+word2,
  })
}
export const change_word3 = (cid,word3) => {
  return post ({
    url: '/cases/change_word3?cid='+cid+'&word3='+word3,
  })
}
export const change_word4 = (cid,word4) => {
  return post ({
    url: '/cases/change_word4?cid='+cid+'&word4='+word4,
  })
}
export const delete_case = (cid) => {
  return post ({
    url: '/cases/delete_case?cid='+cid,
  })
}
export const insert_case = (formData) => {
  return post ({
    url: '/cases/insert_case',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData
  })
}

export const getLikeCases = (cname) => {
  return get({
    url:'/cases/getLikeCases?cname='+cname,
    headers:{
      'Content-Type': 'application/json'
    },
  })
}