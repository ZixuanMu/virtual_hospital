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

