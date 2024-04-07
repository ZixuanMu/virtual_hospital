import {post, get, post2,post3,post4,post5,post6,request} from '@/util/service'
import qs from 'qs';
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
export const topicget = data => {
  return get({
    url: '/topics/getAllTopics',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  });
};

export const changeUserInformation =userData=> {
  return request({
      url: '/users/change_information',
      method: 'post',
      data:qs.stringify(userData)
  });
};
export const addTopic =(question,optionA,optionB,optionC,optionD,answer)=>{
  return post({
    url:'/topics/addTopic?content=' + question+
                      '&contenta=' + optionA +
                      '&contentb=' + optionB +
                      '&contentc=' + optionC +
                      '&contentd=' + optionD +
                      '&answer=' + answer,

                    })
}


export const getVideoUrl = data => {
  return get ({
    url: '/duty/getDutyByName',
    headers: {
      'Content-Type': 'application/json',
    },
    data

  })
}

