const initialState = {
	uid: '',
	name: '',
	email:'',
	password:'',
	rep_password:'',
	status:0
};



const AuthReducer = (state = initialState, action) => {

	switch( action.type){
		case  'changeStatus' : 
			return { ...state, status:action.payload.status};
		case  'changeEmail' : 
			return { ...state, email:action.payload.email};
		case  'changeName' : 
			return { ...state, name:action.payload.name};	
		case  'changePassword' : 
			return { ...state, password:action.payload.password};	
		case  'changeRepPassword' : 
			return { ...state, rep_password:action.payload.rep_password};			
		case 'changeUid':
			return { ...state, status:1, uid:action.payload.uid};			
		default:	
			return state;
	}
};

export default AuthReducer;