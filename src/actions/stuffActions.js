import * as types from './actionTypes.js';

function url(){
	return 'https://jsonplaceholder.typicode.com/users';
}

export function receiveStuff(json) {
	return {type: types.RECEIVE_STUFF, stuff: json};
}

export function fetchStuff() {
	return dispatch => {
		return fetch(url(), {
			method: 'GET',
		})
		.then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                }))
            )
            .then(response => {
                if(response.status === 200){
                    dispatch(receiveStuff(response.data))
                }else{
                    var flash = {
                        type: 'error',
                        title: 'Error getting task list',
                        content: 'There was an error getting the task list. Please try again.'
                    }
                    dispatch({type: "DISPLAY_FLASH", data: flash})
                }
            });
    };
}