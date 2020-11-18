import config from '../config'

const RequestApiService = {
    getAllRequests(){
        return fetch(`${config.API_ENDPOINT}/requests`)
            .then(res=>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    postNewRequest(userId, productVal, categoryVal, infoVal){
        
        let newDate = new Date()
        
        return fetch(`${config.API_ENDPOINT}/requests`,{
            method: 'POST',
            body: JSON.stringify({
                'user_id':userId,
                'product':productVal,
                'category':categoryVal,
                'info':infoVal,
                'date':newDate
            }),
            headers: {
                "content-type":"application/json"
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    getRequestById(id){
        return fetch(`${config.API_ENDPOINT}/requests/${id}`)
            .then(res=>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    getRequestsByUserId(user_id){
        return fetch(`${config.API_ENDPOINT}/requests/users/${user_id}`)
            .then(res=>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    getCommentsByRequestId(request_id){
        return fetch(`${config.API_ENDPOINT}/comments/requests/${request_id}`)
            .then(res=>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    postNewComment(requestId, userId, brandVal, whyVal){
        
        return fetch(`${config.API_ENDPOINT}/comments`,{
            method: 'POST',
            body: JSON.stringify({
                'request_id':requestId,
                'user_id':userId,
                'brand':brandVal,
                'why':whyVal
            }),
            headers: {
                "content-type":"application/json"
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    deleteRequest(requestId){
        return fetch(`${config.API_ENDPOINT}/requests/${requestId}`,{
            method: 'DELETE'
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    deleteComment(commentId){
        return fetch(`${config.API_ENDPOINT}/comments/${commentId}`,{
            method: 'DELETE'
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    updateRequest(id, productVal, infoVal){
        
        return fetch(`${config.API_ENDPOINT}/requests/${id}`,{
            method: 'PATCH',
            body: JSON.stringify({
                'product':productVal,
                'info':infoVal
            }),
            headers: {
                "content-type":"application/json"
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    updateComment(id, brandVal, whyVal){
        
        return fetch(`${config.API_ENDPOINT}/comments/${id}`,{
            method: 'PATCH',
            body: JSON.stringify({
                'brand':brandVal,
                'why':whyVal
            }),
            headers: {
                "content-type":"application/json"
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },
    postNewUser(firstName, lastName, emailVal, passwordVal){
        return fetch(`${config.API_ENDPOINT}/users`,{
            method: 'POST',
            body: JSON.stringify({
                'first_name':firstName,
                'last_name':lastName,
                'email':emailVal,
                'password':passwordVal
            }),
            headers: {
                "content-type":"application/json"
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    },

}

export default RequestApiService;