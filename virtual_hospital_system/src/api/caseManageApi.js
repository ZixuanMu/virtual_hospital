import request from '@/api/request.js'

//获取所有病例
export function case_changeName() {
    return request({
        url: 'http://106.54.206.14:8080/cases/get_all_cases',
        method: 'get',
    })
}

//更改病例名称
export function case_changeName(id,name) {
    return request({
        url: 'http://106.54.206.14:8080/cases/change_cname',
        method: 'post',
        data:
        {
            cid:id,
            cname:name
        }
    })
}