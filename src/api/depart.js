/**
 * 部门请求
 */
import service from '@/utils/service';

export default{
    save,
    remove,
    modify,
    getById
}

function save(params){
    return service({
      url:'/depart/save',
      method:'post',
      data:JSON.stringify(params)
    });
}
function remove(params){
    return service({
        url:`/depart/${params.id}`,
        method:'get'
    });
}
function modify(params){
    return service({
        url:'/depart/modify',
        method:'post',
        data:JSON.stringify(params)
    });
}
function getById(params){
    return service({
        url:`/depart/${params.id}`,
        method:'get'
    });
}