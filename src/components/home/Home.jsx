import React from 'react'
import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Início"
        subtitle="Primeiro projeto React.">
        <div className="display-4">Bem vindo!</div>
        <hr/>
        <p className="mb-0">
            C R U D  de usuários com json-server
        </p>
    </Main>