import {post, get} from '@/util/service'


export const get_all_equipment = data => {
    return get ({
      url: '/equipment/getAllEquipment',
      headers: {
        'Content-Type': 'application/json',
      },
      data
    })
  }
export const change_ename = (eid,ename) => {
    return post ({
      url: '/equipment/change_ename?eid='+eid+'&ename='+ename,
    })
  }
  
  export const change_suffix = (formData) => {
    return post ({
      url: '/equipment/change_equipment_photo',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data:formData
    })
  }
  
  export const change_fun = (eid,fun) => {
    return post ({
      url: '/equipment/change_equipment_fun?eid='+eid+'&fun='+fun,
    })
  }
  export const change_video = (formData) => {
    return post ({
      url: '/equipment/change_equipment_video',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data:formData
    })
  }
  export const change_operation = (eid,operation) => {
    return post ({
      url: '/equipment/change_equipment_operation?eid='+eid+'&operation='+operation,
    })
  }

  export const delete_equipment = (eid) => {
    return post ({
      url: '/equipment/delete_equipment?eid='+eid,
    })
  }

  export const insert_equipment = (formData) => {
    return post ({
      url: '/equipment/insert_equipment',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data:formData
    })
  }
  export const getEquipmentByEname = (ename) => {
    return get ({
      url: '/equipment/getEquipmentByEname?ename='+ename,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }