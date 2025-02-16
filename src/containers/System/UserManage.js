import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers,  createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import './UserManage.scss'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'

class UserManage extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }
    state = {

    }

  async  componentDidMount() {
       await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if(response && response.errCode ===0){
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    createNewUser = async (data) => {
       try {
        let response = await createNewUserService(data);
        if (response && response.errCode !==0) {
            alert(response.errMessage)
        }else {
            await this.getAllUsersFromReact();
            this.setState({
                isOpenModalUser: false
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        }
       } catch (e) {
        console.log(e)
       }
    }

    handleDeleteUser = async (user) => {
        try {
        let res =  await deleteUserService(user.id)
        if(res && res.errCode === 0) {
            await this.getAllUsersFromReact();    
        }else {
            alert(res.errMessage)
        }
        console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = async (user) => {
        console.log('check edit user: ', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if(res && res.errCode === 0) {
                 this.setState({
                    isOpenModalEditUser: false
                 })   
         await  this.getAllUsersFromReact()
        }else {
            alert(res.errCode)
        }
    } catch (e) {
            console.log(e)
        }
    }
/**Life cycle
 *  Run component
 *  1. Run construct -> init state
 *  2. Did mount
 *  3. Render
 */

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
            <ModalUser
                isOpen={this.state.isOpenModalUser}
                toggleFromParent={this.toggleUserModal}
                createNewUser={this.createNewUser}
            />
            { 
                this.state.isOpenModalEditUser && 
                <ModalEditUser 
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleEditUserModal}
                    currentUser = {this.state.userEdit}
                    editUser={this.doEditUser}
                />
            }
           <div className='title text-center'>Manage users System</div>
           <div className='mx-1'>
                <button 
                className='btn btn-primary px-3'
                onClick={() =>this.handleAddNewUser()}
                ><i className='fas fa-plus px-1'></i>
                Add new user</button>
           </div>
           <div className='users-table mt-3 mx-1' >
           <table id="customers">
             <tbody> 
                <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>              
                    { arrUsers && arrUsers.map((item, index) => {
                        return(
                            <tr>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    }) 
                        
                    }   
                    </tbody>          
            </table>          
           </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
