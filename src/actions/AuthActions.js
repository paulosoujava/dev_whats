import firebase from '../FirebaseConnection';

const USER = 'user';

export const checkLogin = () => {

	return (dispatch) => {

		firebase.auth().onAuthStateChanged( ( user ) => {
			if(user) {
				dispatch({
					type: 'changeUid',
					payload:{
					  uid: user.uid
					}
				});
			} else {
				dispatch({
					type:'changeStatus',
					payload:{
						status:2
					}
				});
			}

		});
	}

};

export const exit = () =>{
	firebase.auth().signOut();
	return{
		type:'changeStatus',
		payload:{
			status:2
		}
	};
};

export const entryLogin = ( email, password, callback )=>{
	return ( dispatch )=>{
		firebase.auth().signInWithEmailAndPassword(email, password )
		.then(()=>{
				let uid = firebase.auth().currentUser.uid;

				callback();
				
				dispatch({
					type:'changeUid',
					payload:{
						uid:uid
					}
				});
			})
		.catch((error)=>{
			switch( error.code ){
				case 'auth/invalid-email':
					alert("Vixi, esse email ai, é doidão, acho que é inválido, tente outro.");
						
				break;
				case 'auth/user-disabled':
					alert("Ops,você foi desativado de nossa base de dados, em caso de dúvidas entre em contato conosco.");
						
				break;
				case 'auth/user-not-found':
					alert("Ops, usuário não encontrado, você já fez o seu cadastro? É preciso ter uma conta para poder fazer este login.");
				break
				case 'auth/wrong-password':
					alert("Ops, email/senha inválidos");
						
				break;
			}
			callback();
		});
	};
};
export const createNewAccount = (name, email, password, rep_password, callback) =>{
	return ( dispatch )=>{
			firebase.auth().createUserWithEmailAndPassword( email, password )
			.then(()=>{
				let uid = firebase.auth().currentUser.uid;
				callback();

				firebase.database().ref(USER).child(uid).set({
					name:name
				});

				dispatch({
					type:'changeUid',
					payload:{
						uid:uid
					}
				});
			})
			.catch((error)=>{
				switch( error.code ){
					case 'auth/email-already-in-use':
						alert("Oxii, não é que  este email já está cadastrado");
						break;
					case 'auth/invalid-email':
						alert("Vixi, esse email ai, é doidão, acho que é inválido, tente outro.");
						break;
					case 'auth/operation-not-allowed':
						alert("Eiaaa tente mais tarde, estamos passando por uma turbulência.");
						break;		
					case 'auth/weak-password':
						alert("Ahhh essa senha é muito fácil, tenta criar uma mais dificil, por favor");
						break;			
				}
				callback();
			});
	};
}

export const changeEmail = (email) =>{
	return {
			type: 'changeEmail',
			payload:{
				email:email
			}
	};
}
export const changeName = (name) =>{
	return {
			type: 'changeName',
			payload:{
				name:name
			}
	};
}
export const changePassword = (password) =>{
	return {
			type: 'changePassword',
			payload:{
				password:password
			}
	};
}
export const changeRepPassword = (rep_password) =>{
	return {
			type: 'changeRepPassword',
			payload:{
				rep_password:rep_password
			}
	};
}
