import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import { toast } from 'react-toastify';
import ModalConfirmation from '../modal/ModalConfirmation'
import ModalEdit from '../modal/ModalEdit'
import Flash from '../flash/Flash'
import { Table } from 'react-bootstrap'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: '', phone: ''},
    list: []
}

export default class UserCrud extends Component {

    constructor(props) {
        super(props)

        this.remove = this.remove.bind(this);
    }


    notifySuccess = (msg) => toast.success(`👌 ${msg}!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        })

    notifyLoad = (msg) => toast.info(`😸 ${msg}!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        })

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list})
            })
        
        method === 'post'
        ? this.notifySuccess(`${user.name} criado com sucesso`)
        : this.notifySuccess(`${user.name} editado com sucesso`)
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }


    renderButtons() {
        return (
            <div className="row">
                <div className="col-sm-6 d-flex justify-content-start">
                    <button className="btn btn-success"
                        onClick={e => this.save(e)}>
                            Salvar
                    </button>

                    <button className="btn btn-warning ml-2"
                        onClick={e => this.clear(e)}>
                            Limpar
                    </button>
                </div>
            </div>
        )
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label><strong>Nome</strong></label>
                            <input type="text" className="form-control"
                            name="name"
                            value={this.state.user.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do usuário..."/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label><strong>E-mail</strong></label>
                            <input type="text" className="form-control"
                            name="email"
                            value={this.state.user.email}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o e-mail do usuário..."/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label><strong>Telefone</strong></label>
                            <input type="text" className="form-control"
                            name="phone"
                            value={this.state.user.phone}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o telefone do usuário..."/>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    load(user) {
        this.setState({ user })
        this.notifyLoad(`${user.name} está pronto para ser editado`)
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState ({ list })
        })
        this.notifySuccess('Cadastro excluído com sucesso')
    }

    renderTable() {
        return (
            <Table hover className="mt-4 col-sm-12">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Fone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow()}
                </tbody>
            </Table>
        )
    }


    renderRow() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                        <ModalEdit
                            title="Edição de usuário"
                            loadButtonHandler={(e) => this.load(user)}
                            saveButtonHandler={(e) => this.save(user)}
                            buttonColor="warning"
                            buttonMsg={<i className="fa fa-pencil"></i>}
                        >
                                {this.renderForm()}
                        </ModalEdit>
                        <ModalConfirmation
                            title="Confirmar exclusão de usuário"
                            saveButtonHandler={(e) => this.remove(user)}
                            buttonColor="danger"
                            buttonMsg={<i className="fa fa-trash"></i>}
                        >
                            Tem certeza que deseja excluir  {user.name}? 
                        </ModalConfirmation>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderButtons()}
                {this.renderTable()}
                <Flash />
            </Main>
        )
    }
}