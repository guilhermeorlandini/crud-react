import React, { Component } from 'react'
import { Button, Modal} from 'react-bootstrap'

const initialState = {
    show: false
}

export default class ModalConfirmation extends Component {

    state = {...initialState}

    constructor(props) {
        super(props)

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleShow () {
        this.setState({ show: true})
    }

    handleClose () {
        this.setState({...initialState})
    }


    render() {
        return (
            <React.Fragment>
                <Button variant="primary" onClick={this.handleShow}>
                    Abrir Modal
                </Button>
                <Modal show={this.state.show} animation={false}>
                    <Modal.Header>
                        <Modal.Title>Título</Modal.Title>
                        <Button className="close" onClick={this.handleClose}>
                            x
                        </Button>
                        </Modal.Header>
                    <Modal.Body>
                        Corpo
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Salvar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}