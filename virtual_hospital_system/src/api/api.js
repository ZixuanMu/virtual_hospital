import {post, get, post2,post3,post4,post5,post6,request} from '@/util/service'

export const login = data => {
  return get ({
    url: '/users/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const topicget = data => {
  return get({
    url: '/topics/getAllTopics',
    headers: {
      'Content-Type': 'application/json'
    },
    data
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

export const addExamm =(content,topicnumber)=>{
  return post({
    url:'/exams/insertExam?content=' + content+
                      '&topicnumber=' +topicnumber,

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
export const insert_case = data => {
  return post ({
    url: '/cases/insert_case',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export async function getExams() {  
  return get ({
    url: '/exams/getExams',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
