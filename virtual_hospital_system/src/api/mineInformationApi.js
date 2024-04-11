import {post, get, post2,post3,post4,post5,post6,request} from '@/util/service'


export const fetchUserData = data => {
    return get({
      url: '/users/get_user',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  }

  export const changeUserInformation =(username,email,phone,sex)=> {
    return post({
        url: '/users/change_information?username='+username+
        '&email='+email+
        '&phone='+phone+
        '&sex='+sex,
  
    })
  }
  export const changePassword =(password,passwordCh)=> {
    return post({
        url: '/users/change_password?opassword='+password+
        '&npassword='+passwordCh,
  
    })
  }


  
export const  reqUpload= (formData) => {
  return post ({
    url: '/users/change_suffix',
    headers: {
      'Content-Type': 'file/form-data',
    },
    data:formData
  })
}