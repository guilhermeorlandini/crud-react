import React, { Component } from 'react'
import { Button, Modal} from 'react-bootstrap'

const initialState = {
    show: false
}

export default class ModalConfirmation extends Component {

    state = {...initialState}

    constructor(props) {
        super(props)

        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    onClick (event) {
        this.props.saveButtonHandler(this.props.user) 
        this.setState({show: false})
    }

    handleClose () {
        this.setState({...initialState})
    }
    handleShow () {
        this.setState({ show: true})
    }

    render() {
        return (
            <React.Fragment>
                <Button variant={this.props.buttonColor} onClick={this.handleShow}>
                    {this.props.buttonMsg}
                </Button>
                <Modal show={this.state.show} animation={false}>
                    <Modal.Header>
                        <Modal.Title>{this.props.title}</Modal.Title>
                        <Button className="close" onClick={this.handleClose}>
                            x
                        </Button>
                        </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="success" onClick={this.onClick}>
                        Confirmar
                    </Button>
                    <Button variant="danger" onClick={this.handleClose}>
                        Cancelar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}