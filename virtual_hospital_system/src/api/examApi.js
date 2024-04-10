import {post, get, post2,post3,post4,post5,post6,request} from '@/util/service'
export const addExamm =(content,topicnumber)=>{
    return post({
      url:'/exams/insertExam?content=' + content+
                        '&topicnumber=' +topicnumber,
  
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