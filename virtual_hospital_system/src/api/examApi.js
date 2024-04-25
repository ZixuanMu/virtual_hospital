import {post, get, post2,post3,post4,post5,post6,request} from '@/util/service'
export const addExamm =(content,topicnumber,time)=>{
    return post({
      url:'/exams/insertExam?content=' + content+
                        '&topicnumber=' +topicnumber+'&time='+time,
  
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
export const changeEname = (exid,content) => {
    return post ({
      url: '/exams/changeExamName?exid='+exid+'&content='+content,
    })
  }

  export async function getCompletedExams() {
    return get({
      url: '/tests/getallmyexams',

      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  export const admitexam = (exid,result) => {
    return post ({
      url: '/tests/admitexam?exid='+exid+'&result='+result,
    })
  }
  

  export const getMyexam = data => {
    return get({
      url:'/tests/getmyexam',
      headers:{
        'Content-Type': 'application/json'
      },
      data
    })
  }

  export const changetime =(time,exid)=> {
   return post ({
      url: '/exams/changeExamTime?exid='+exid+'&time='+time,
    })
  }
  export const searchinList= data =>{
    return get ({
      url: 'exams/getExamsByContent',
      headers: {
        'Content-Type': 'application/json',
      },
      data
    })

    

  }
  export const searchinListT= data =>{
    return get ({
      url: '/topics/getTopicBycontent',
      headers: {
        'Content-Type': 'application/json',
      },
      data
    })

    

  }
