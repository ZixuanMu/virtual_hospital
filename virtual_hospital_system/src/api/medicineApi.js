import {post, get} from '@/util/service'

export const get_all_medicine = data => {
    return get ({
      url: '/medicine/getAllMedicine',
      headers: {
        'Content-Type': 'application/json',
      },
      data
    })
  }
  
  export const insert_medicine = (mname,content) => {
    return post ({
        url: '/medicine/insert_medicine?mname='+mname+'&content='+content,
    })
  }
  
  export const change_mname = (mid,mname) => {
    return post ({
      url: '/medicine/change_mname?mid='+mid+'&mname='+mname,
    })
  }

  export const change_content = (mid,content) => {
    return post ({
      url: '/medicine/change_medicine_content?mid='+mid+'&content='+content,
    })
  }
      
  export const delete_medicine = (mid) => {
    return post ({
      url: '/medicine/delete_medicine?mid='+mid,
    })
  }
  
  export const getMedicineByMname = (ename) => {
    return get ({
      url: '/equipment/getEquipmentByEname?ename='+ename,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }