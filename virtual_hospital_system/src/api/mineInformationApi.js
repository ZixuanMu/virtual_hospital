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
  export const reqUpload = (file) => {
    // 创建了一个新的 FormData 对象，用于构建表单数据,并将file添加到FormData对象中
    const formData = new FormData();
    formData.append('file', file);
   
    return request.post('/users/change_suffix', formData);
  };
  