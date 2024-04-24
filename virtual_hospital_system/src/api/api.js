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
export const chatWithGpt = data => {
  return get ({
    url: 'assistance/gethelp',
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

export const change_photo1 = (formData) => {
  return post ({
    url: '/cases/change_photo1',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData
  })
}

export const change_photo2 = (formData) => {
  return post ({
    url: '/cases/change_photo2',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData
  })
}

export const change_type = (cid,type) => {
  return post ({
    url: '/cases/change_type?cid='+cid+'&type='+type,
  })
}
export const change_video4 = (formData) => {
  return post ({
    url: '/cases/change_video4',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData
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
export async function getExams() {  
  return get ({
    url: '/exams/getExams',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const get_all_users = data => {
  return get ({
    url: '/manager/get_all_users',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export const change_user_password = (uid,password) => {
  return post ({
    url: '/manager/change_user_password?uid='+uid+'&password='+password,
  })
}

export const delete_user = (uid) => {
  return post ({
    url: '/manager/delete_user?uid='+uid,
  })
}

export const register = (formData) => {
  return post ({
    url: '/manager/register',
    headers: {
      'Content-Type': 'file/form-data',
    },
    data:formData
  })
}

export const getLikeUsers = (username) => {
  return get({
    url:'/manager/get_like_users?username='+username,
    headers:{
      'Content-Type': 'application/json'
    },
  })
}

export const get_all_duties = data => {
  return get ({
    url: '/duty/get_all_duties',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const insert_duty = (formData) => {
  return post ({
    url: '/duty/insert_duty',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData
  })
}

export const change_actor = (did,actor) => {
  return post ({
    url: '/duty/change_actor?did='+did+'&actor='+actor,
  })
}

export const change_name = (did,name) => {
  return post ({
    url: '/duty/change_name?did='+did+'&name='+name,
  })
}

export const change_content = (did,content) => {
  return post ({
    url: '/duty/change_content?did='+did+'&content='+content,
  })
}

export const change_pic = (formData) => {
  return post ({
    url: '/duty/change_pic',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData
  })
}

export const change_video = (did,formData) => {
  return post ({
    url: '/duty/change_video?did='+did,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData
  })
}       

export const delete_duty = (did) => {
  return post ({
    url: '/duty/delete_duty?did='+did,
  })
}

export const getDutyByActor = data => {
  return get ({
    url: '/duty/getDutyByActor',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

export const getDepartmentByDid = data => {
  return get({
    url: 'department/getDepartmentByDid',
    headers:{
      'Content-Type': 'application/json'
    },
    data
  })
}

export const getEidByDid = data => {
  return get({
    url: 'equipment/getEidByDid',
    headers:{
      'Content-Type': 'application/json'
    },
    data
  })
}

export const getEquipmentByEid = data => {
  return get({
    url: 'equipment/getEquipmentByEid',
    headers:{
      'Content-Type': 'application/json'
    },
    data
  })
}

export const getAllMedicine = data => {
  return get({
    url: 'medicine/getAllMedicine',
    headers:{
      'Content-Type': 'application/json'
    },
    data
  })
}

export const getCaseByType = (type) => {
  return get({
    url:'/cases/getCaseByType?type='+type,
    headers:{
      'Content-Type': 'application/json'
    },
  })
}
